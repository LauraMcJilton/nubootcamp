import { Component } from '@angular/core';
import { GitIdInfo, GitRepo, GitIssue, GitMilestone} from './github-id';
import { GitIdInfoService } from './git-id-info.service';
import { Subscription } from 'rxjs/Subscription';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  Repo = '';
  ghIds: GitIdInfo[] = [];
  repos: GitRepo[] = [];
  issues: GitIssue[] = [];
  milestones: GitMilestone[] = [];
  //reposinfo: GitRepoInfo[];
  
  private getGitsub: Subscription;
  private gitRepo: Subscription;
  private getIssue: Subscription;
  private getMilestone: Subscription;

  errorMessage = null;

  constructor(private ids: GitIdInfoService) { }

  addGhId(toadd, Repoadd: string) {
    this.errorMessage = null;

    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';

    this.gitRepo = this.ids.GetGitRepo(toadd, Repoadd).subscribe( info => {
      this.repos.push(info as GitRepo);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });


    this.getIssue = this.ids.GetGitIssue(toadd, Repoadd).subscribe( info => {
      this.issues.push(info as GitIssue);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
    });

    this.getMilestone = this.ids.GetGitMilestone(toadd, Repoadd).subscribe( info =>{
      this.milestones.push(info as GitMilestone);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
    });


  }
}
