import {
  Component, ChangeDetectorRef, ElementRef, HostListener, ChangeDetectionStrategy,
  ViewChild, Input
} from '@angular/core';
import {D3Service} from '../../d3/d3.service';
import {ForceDirectedGraph} from '../../d3/models/force-directed-graph';
import {Node} from '../../d3/models/node';
import {Link} from '../../d3/models/link';
import * as d3 from 'd3';
import {GraphDataService} from '../../services/graph-data.service';
import {DownloadButtonComponent} from '../../download-button/download-button.component';
import {LoadingService} from '../../services/loading.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div *ngIf="loading" class = "loadingIcon" fxLayoutAlign="center center">
    <mat-spinner></mat-spinner>
  </div>
    <svg #svg [attr.width]="_options.width"  [attr.height]="_options.height">
      <g [zoomableOf]="svg" [draggableInGraph]="graph" pharosZoomable>
        <g [linkVisual]="link" [clickableLink] = "link" [hoverableLink]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes" [hoverableNode]="node"
        [clickableNode]="node" [draggableNode]="node"
           [draggableInGraph]="graph">
        </g>
        <svg:g menu-list #menu></svg:g>
      </g>
        <defs>
          <marker id="arrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#A5A5A5" stroke ="#A5A5A5" stroke-width="2" d = "M0,-5L10,0L0,5"></path>
          </marker>
          <marker id="hoverarrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#595959" stroke ="#595959" stroke-width="2" d = "M0,-5L10,0L0,5"></path>
          </marker>
          <marker id="flatarrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#A5A5A5" stroke ="#A5A5A5" stroke-width="2" stroke-width="3" d = "M 8,-8 L 8, 8"></path>
          </marker>
          <marker id="hoverflatarrow" viewBox="0 -5 10 10" refX= '8.75' refY = '0' markerWidth="8" markerHeight ="8" orient="auto">
            <path fill = "#595959" stroke ="#595959" stroke-width="2" stroke-width="3" d = "M 8,-8 L 8, 8"></path>
          </marker>
        </defs>
    </svg>
  <!--
          <download-button ></download-button>
-->
  `,
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {

  constructor(public d3Service: D3Service,
              private ref: ChangeDetectorRef,
              public el: ElementRef,
              private graphDataService: GraphDataService,
              private loadingService: LoadingService) {
  }

  get options() {
    return this._options = {
      width: this.el.nativeElement.parentElement.offsetWidth - 50,
      height: window.innerHeight * .6
      //  height: window.innerHeight-(window.outerHeight-window.innerHeight)
    };
  }
/*  @ViewChild(DownloadButtonComponent)
  private downloader: DownloadButtonComponent;*/
  public nodes: Node[] = [];
  public links: Link[] = [];
  subscription: Subscription;
  @Input() loading = true;

  graph: ForceDirectedGraph;

/*  downloadGraph(): void {
    this.downloader.downloadFile(d3.select('svg'), this.options);
  }*/

  _options: {width, height} = {width: 600, height: 600};



  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  ngOnInit() {
    this.loadingService.loading$.subscribe(res => this.loading = res);
    this.graphDataService.graphhistory$.subscribe(res => {
      this.nodes = res.nodes;
      this.links = res.links;
      if (this.graph) {
        this.graph.update(res, this.options);
      }
    });

    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this._options);
    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }
}
