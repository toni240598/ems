import { FormControl } from "@angular/forms";
import { MatTableDataSource, Sort, MatSort, MatPaginator, PageEvent } from "@angular/material";

export interface TableInterface {
  getArrays(): Array<Array<String | Number>>;
}

export class Filter {
  column: String;
  label: String;
}

export class Table<T> {
  constructor() {}

  // varibel metadata dari service
  private arrays: Array<Array<String | Number>>;
  // menyimpan isi dari colomn yang akan digunakan di fungsi auto complete
  private autoCompletes: Array<String | Number> = [];
  // isi data tabel yang akan digunakan
  private datasources: Array<T> = [];
  // mat table class
  private matTable: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  // menyimpan column id yang akan di gunakan di angular material table
  columns: String[] = [];
  // data untuk set colomn mana saya yang ingin di filter
  filters: Filter[] = [];
  // form control untuk type filter;
  filterModel: FormControl = new FormControl(null);
  // form control untuk search
  searchModel: FormControl = new FormControl(null);


  // options paginator
  pageSizes = [25, 50, 100, 200];
  pageSize: Number = 0;
  pageIndex: Number = 0;
  pageLength: Number = 0;

  // set configuration
  config(
    columns: String[],
    filters: Filter[],
    datasources: Array<T>,
    arrays: Array<Array<String | Number>>,
    sort: MatSort
  ) {
    Object.assign(this, { columns, filters, datasources, arrays });
    this.matTable.sort = sort;
    // this.matTable.paginator = paginator;
    const pageSize = localStorage.getItem('pageSize');
    this.pageSize = pageSize === null ? 25 : parseInt(pageSize);
    localStorage.setItem('pageSize', this.pageSize.toString());
    this.pageLength = datasources ? datasources.length : 0;
    // fungsi yang akan jalan jika ada event form control filter Model
    this.filterModel.valueChanges.subscribe(_typeFilter => {
      if (_typeFilter) {
        this.searchModel.setValue(null);
        const indexColumn = this.columns.findIndex(
          _column => _column === _typeFilter
        );
        this.autoCompletes = [];
        for (const metadata of this.arrays) {
          this.autoCompletes.push(metadata[indexColumn]);
        }
      }
    });
    // isi nilai value type filter sesuai filters config index [0]
    this.filterModel.setValue(
      this.filters.length !== 0 ? this.filters[0].column : null
    );
  }

  // ambil data datasource tergantung apakah search jalan, jika jalan search di filter dulu
  getDatasources(): MatTableDataSource<T> {
    let textValue: string,
      searchText: string,
      datasources: Array<T> = [];
    if (!this.searchModel.value) {
      datasources = Object.assign([], this.datasources);
    } else {
      datasources = this.datasources.filter(_data => {
        textValue = this.normalText(JSON.stringify(_data));
        searchText = this.normalText(this.searchModel.value);
        return textValue.indexOf(searchText) !== -1;
      });
    }
    this.matTable.data = datasources;
    return this.matTable;
  }

  getAutoCompletes(): Array<String | Number> {
    let autoCompletes: Array<String | Number> = [];
    if (!this.searchModel.value) {
      autoCompletes = this.autoCompletes;
    } else {
      autoCompletes = this.autoCompletes.filter(_value => {
        const value = this.normalText(_value);
        const searchText = this.normalText(this.searchModel.value);
        return value.indexOf(searchText) !== -1;
      });
    }
    return autoCompletes;
  }

  // menghapus spasi dan titik koma
  private normalText(text: String | Number): string {
    return text
      .toString()
      .toLocaleLowerCase()
      .split(" ")
      .join("");
  }

  // mengurutkan data
  sortData(sort: Sort) {
    if (!sort.active || sort.direction === "") {
      this.matTable.data = this.datasources;
      return;
    }
    this.matTable.data = this.arrays
      .sort((a, b) => {
        const isAsc = sort.direction === "asc";
        let sortValue = 0;
        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i] === sort.active) {
            sortValue = (this.normalText(a[i]) < this.normalText(b[i]) ? -1 : 1) * (isAsc ? 1 : -1);
          }
        }
        return sortValue;
      })
      .map(_array => this.getDatasourceById(_array[0]));
  }

  // cari berdasarkan id
  private getDatasourceById(id: Number | String): T {
    const index = this.datasources.findIndex(_data => _data["id"] === id);
    return this.datasources[index];
  }

  // hitung length table
  getLength(): Number {
    return this.datasources ? this.datasources.length : 0;
  }

  setPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    localStorage.setItem('pageSize', event.pageSize.toString());
  }

}
