import sender from "../sender";
import { type ReportData } from "../constants";
import dayjs from "dayjs";

class Reporter {
  report(data: ReportData) {
    if (typeof data.eventInfo.createTime === 'undefined') {
      data.eventInfo.createTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }
    sender.addTask(data);
  }
}

const reporter = new Reporter();

export default reporter;
