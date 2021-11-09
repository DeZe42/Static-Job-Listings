import { Component, OnInit } from '@angular/core';
import dataJSON from '../assets/data.json';

interface JOBS {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: any;
  tools: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  jobs: JOBS[] = dataJSON;
  filteredJobs: any = [];
  filterData: any = [];

  constructor() {

  }

  ngOnInit() {
    this.filteredJobs = this.jobs;
  }

  filter(element) {
    if (this.filterData.length == 0) {
      this.filterData.push(element);
    } else {
     if (!this.filterData.includes(element)) {
      this.filterData.push(element);
     }
    }
    this.filteredJobs = this.jobs.filter(e => {
      return this.filterData.find(f => {
        return e.languages.includes(f);
      });
    });
  }

  remove(element) {
    this.filterData = this.filterData.filter(e => {
      return e != element;
    });
    if (this.filterData.length == 0) {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter(e => {
        return this.filterData.find(f => {
          return e.role == f && e.level == f && e.languages.includes(f);
        });
      });
    }
  }
}