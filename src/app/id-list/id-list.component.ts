import { Component, OnInit, Input } from '@angular/core';
import { GitIdInfo, GitRepo, GitIssue, GitMilestone } from '../github-id';

@Component({
  selector: 'app-id-list',
  templateUrl: './id-list.component.html',
  styleUrls: ['./id-list.component.css']
})
export class IdListComponent implements OnInit {

  ghIds: GitIdInfo[] = [];
  repos: GitRepo[][] = [];
  issues: GitIssue[][] = [];
  miletones: GitMilestone[][] = [];
  selectedValue: string;
  stories: string = "stories";
  open: string = "open";
  closed: string = "closed";



  @Input() idlist: GitIdInfo[];
  @Input() repolist: GitRepo[];
  @Input() issuelist: GitIssue[];
  @Input() milestonelist: GitMilestone[];


  
  constructor() { }

  toggleFavorite(favid: GitIdInfo) {
    favid.favorite = !favid.favorite;
  }
  
  ngOnInit() {
      console.log(this.repolist);
      console.log(this.issuelist);
      console.log(this.milestonelist);
  }

}
