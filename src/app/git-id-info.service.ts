import { Injectable } from '@angular/core';
import { GitIdInfo, GitRepo, GitIssue, GitMilestone} from './github-id';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const githubAPI = 'https://api.github.com/';

@Injectable()
export class GitIdInfoService {

  constructor(private http: HttpClient) { }

  GetGitIdInfo(login: string): Observable<GitIdInfo> {
    const userAPI = githubAPI + 'users/';
    return(this.http.get<GitIdInfo>(userAPI + login));
  }

  GetGitRepo(login, Repo: String): Observable<GitRepo[]>{
    const userRepo = githubAPI + 'repos/';
    return(this.http.get<GitRepo[]>(userRepo + login + '/' + Repo));
  }

  GetGitIssue(login, Repo: String): Observable<GitIssue>{
    const userIssue = githubAPI + 'repos/';
    return(this.http.get<GitIssue>(userIssue + login + '/' + Repo + '/issues?state=all'));
  }

  GetGitMilestone(login, Repo: String): Observable<GitMilestone>{
    const userMilestone = githubAPI + 'repos/';
    return(this.http.get<GitMilestone>(userMilestone + login + '/' + Repo + '/milestones'));
  }
  
}
