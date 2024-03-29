import { BuyState, DetailInfoType } from "./types"

export function number_format(number:number, decimals = 6 ) {
  return Number(Number(number || 0).toFixed(decimals))
}
export const newDateFormat=(date:any)=>{
  const arr1 = new Date(date).toDateString().split(' ')
  arr1.shift()
  return [arr1.join('-'),new Date(date).toLocaleTimeString()].join(' ')
}
export function hidehash(str:string, len = 4) {
  return str ? `${str.slice(0, len)}....${str.slice(-len-1)}` : ""
}
export function dateFormat(date: string | number,utc?:boolean) {
  if (!date) {
    return;
  }
  try {
    const dateline = utc ? new Date(date): toLocalTime(date);
    const newtime = baseDate("m0-d0-y0 h0:i0:s0", dateline);
    return newtime
  } catch (e) {
    return "—— ——";
  }
}
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const timeToEng = function (month: string) {
  return months[Number(month)];
};
const utcDiff = (new Date()).getTimezoneOffset()/ 60 * -1


export function baseDate(fmt: string, date: Date) {
  let ret;
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();
  const minute = date.getMinutes().toString();
  const second = date.getSeconds().toString();
  const hour = date.getHours().toString();
  const opt: any = {
    y0: year, // 年
    //     "m+": (date.getMonth() + 1).toString(), // 月
    m0: timeToEng(month), // 月
    d0: day, // 日
    h0: hour, // 时
    i0: minute, // 分
    s0: second, // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return `${fmt} UTC${utcDiff >=0 ? '+':''}${utcDiff}`
  return fmt;
}


export const objectToUrlParams=(obj:any)=>{
  let params = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key];
      if(value === undefined){
        continue
      }
      let param = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      params.push(param);
    }
  }
  return params.join('&');
}


export const toLocalTime = (date:any)=>{
  if(!date){
    return new Date()
  }
  const localTime = new Date(date)
  // console.log((new Date()).getTimezoneOffset() * -1 + localTime.getMinutes())
  localTime.setMinutes((new Date()).getTimezoneOffset() * -1 + localTime.getMinutes())
  return localTime 
}
//1705153787492
//1705388400000
export const foramtDateInfo = (item: any,type:DetailInfoType ) => {
  if(!item){
    return null
  }
  const localTime = new Date()
  // const starttime = toLocalTime(item.starttime)
  const endtime = toLocalTime(item?.enttime)
  const starttime = toLocalTime(item?.starttime)
  
  const arr = type === DetailInfoType.public ? [BuyState.Public_Ended,BuyState.Public_NotStarted,BuyState.Public_InProgress] :[BuyState.White_Ended,BuyState.White_NotStarted,BuyState.White_InProgress]

  // const index = endtime.getTime() < localTime.getTime() ? 0 : (starttime.getTime() < localTime.getTime() ? 2 : 1)
  const index = starttime.getTime() > localTime.getTime() ? 1 : (endtime.getTime() < localTime.getTime() ? 0 : 2)

  return arr[index]
}



export const sleep=(ms: number)=> {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000))
}
