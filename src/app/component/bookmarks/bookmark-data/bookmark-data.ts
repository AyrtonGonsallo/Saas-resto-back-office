import { Component, inject, input } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Feathericon } from '../../../shared/component/feathericon/feathericon';
import { bookmarks, bookmark } from '../../../shared/data/bookmark/bookmarks';
import { EditBookmark } from '../bookmark-modal/edit-bookmark/edit-bookmark';

@Component({
  selector: 'app-bookmark-data',
  imports: [Feathericon],
  templateUrl: './bookmark-data.html',
  styleUrl: './bookmark-data.scss',
})
export class BookmarkData {
  readonly activeTab = input<string>();

  public bookmark = bookmark;
  public bookmarkDetails: bookmarks[];
  public favData: bookmarks[] = [];
  public bookmarkTitle: string;
  public listView: boolean = false;
  private modal = inject(NgbModal);

  ngOnChanges() {
    this.bookmark.filter(data => {
      const activeTab = this.activeTab();
      if (data.value == activeTab) {
        this.bookmarkTitle = data.title;
        this.bookmarkDetails = data.data;
      } else if (activeTab && data.value == 'favorites') {
        data.data = this.favData;
      }
    });
  }

  changeStyle(value: string) {
    if (value == 'list') {
      this.listView = true;
    } else if (value == 'grid') {
      this.listView = false;
    }
  }

  favoriteBookmark(details: bookmarks) {
    this.bookmark.filter(data => {
      data.data.filter(subData => {
        if (subData.id == details.id && data.value == this.activeTab()) {
          subData.favorite = !subData.favorite;
          if (subData.favorite) {
            this.favData.push(subData);
          } else {
            this.favData.splice(this.favData.indexOf(subData), 1);
          }
        }
      });
    });
  }

  deleteBookmark(details: bookmarks) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        this.bookmark.filter(data => {
          if (data.data.includes(details)) {
            data.data.splice(data.data.indexOf(details), 1);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      } else if (result.dismiss) {
        Swal.fire({
          title: 'Your imaginary file is safe!',
        });
      }
    });
  }

  editBookmark(details: bookmarks) {
    const editBookmark = this.modal.open(EditBookmark, {
      size: 'lg',
      windowClass: 'modal-bookmark',
    });
    editBookmark.componentInstance.bookmarkDetails = details;
  }
}
