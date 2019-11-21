export default {
  addZero(val){
    return val<10?'0'+val:val
  },

  transform(date){
    var time = new Date(date)
    var y = time.getFullYear()
    var m = time.getMonth()+1
    var d = time.getDate()
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ss = time.getSeconds()
    let format = y + '-' + this.addZero(m) + '-' + this.addZero(d) + ' ' + this.addZero(hh) + ':' + this.addZero(mm) + ':' + this.addZero(ss);
    return format;
  }
}