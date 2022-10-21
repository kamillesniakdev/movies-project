import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addItem(id: string) {
    const visitedItems = this.getItems();
    if (visitedItems.includes(id)) {
      visitedItems.splice(visitedItems.indexOf(id), 1)
    }
    if (visitedItems?.length > 5) {
      visitedItems.pop()
    }
    localStorage.setItem('visited', JSON.stringify([id, ...visitedItems]))
  }

  getItems(): Array<string> {
    return JSON.parse(localStorage.getItem('visited') ?? '[]') as Array<string>;
  }

  getItemsToDisplay(currentlyDisplayedMovieID: string): Array<string> {

    const visitedItems = this.getItems();

    this.addItem(currentlyDisplayedMovieID);

    if (visitedItems.includes(currentlyDisplayedMovieID)) {
      visitedItems.splice(visitedItems.indexOf(currentlyDisplayedMovieID), 1);
      return visitedItems;
    } else if (visitedItems.length > 4){
      return visitedItems.slice(0, -1);
    } else {
      return visitedItems;
    }
  }
}
