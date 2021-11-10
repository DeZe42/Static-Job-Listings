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

  filter(key, value) {
    if (this.filterData.length == 0) {
      this.filterData.push({ type: key, name: value });
    } else {
      let found = false;
      for (let i = 0; i < this.filterData.length; i++) {
        if (this.filterData[i].name == value) {
          found = true;
          break;
        }
      }
      if (found == false) {
        this.filterData.push({ type: key, name: value });
      }
    }
    this.filteredJobs = this.multipleFilter(this.jobs, this.filterData);
  }

  remove(value) {
    this.filterData = this.filterData.filter(e => {
      return e != value;
    });
    if (this.filterData.length == 0) {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.multipleFilter(this.jobs, this.filterData);
    }
  }

  multipleFilter(jobs, filters) {
    return jobs.filter(element => {
      return filters.every(val => {
        return element[val.type] === val.name || element[val.type].includes(val.name);
      });
    });
  }

  clear() {
    this.filterData = [];
    this.filteredJobs = this.jobs;
  }
}