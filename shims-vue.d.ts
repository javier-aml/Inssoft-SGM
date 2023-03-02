declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
  }

declare let JsonExcel: any
  declare module 'vue-json-excel' {
    export = JsonExcel;
  }
