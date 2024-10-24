// Code.gs
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('循環行事曆建立器')
      .setWidth(600)
      .setHeight(600);
}

// 取得所有可用的日曆
function getAvailableCalendars() {
  try {
    const calendars = CalendarApp.getAllCalendars();
    return calendars.map(calendar => ({
      id: calendar.getId(),
      name: calendar.getName(),
      isOwner: calendar.isOwnedByMe()
    })).filter(cal => cal.isOwner);
  } catch (e) {
    console.error('取得日曆列表時發生錯誤：', e);
    throw new Error('無法取得日曆列表：' + e.toString());
  }
}

function createRecurringEvents(eventNames, calendarId) {
  try {
    // 取得指定的日曆
    const calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      throw new Error('找不到指定的日曆');
    }
    
    const today = new Date();
    let startDate = new Date(today);
    
    // 調整到下一個週一
    while (startDate.getDay() !== 1) {
      startDate.setDate(startDate.getDate() + 1);
    }
    
    // 過濾掉空白的事件名稱
    const filteredEventNames = eventNames.filter(name => name.trim() !== '');
    if (filteredEventNames.length === 0) {
      throw new Error('請至少輸入一個有效的事件名稱');
    }
    
    // 計算總週數（一年52週）
    const totalWeeks = 52;
    let createdEvents = 0;
    
    // 建立一整年的事件
    for (let week = 0; week < totalWeeks; week++) {
      const eventIndex = week % filteredEventNames.length;
      const eventName = filteredEventNames[eventIndex];
      
      let weekStartDate = new Date(startDate);
      weekStartDate.setDate(weekStartDate.getDate() + (week * 7));
      
      let weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 5);
      
      weekStartDate.setHours(0, 0, 0);
      weekEndDate.setHours(23, 59, 59);
      
      let holidayCheck = checkHolidays(weekStartDate, weekEndDate);
      if (!holidayCheck.isFullWeekHoliday) {
        try {
          calendar.createAllDayEvent(
            eventName,
            weekStartDate,
            weekEndDate,
            {
              description: '[AutoEventCreator]\n自動建立的週期性事件\n第 ' + (week + 1) + ' 週',
            }
          );
          createdEvents++;
        } catch (e) {
          console.error('建立事件時發生錯誤：', e);
          throw new Error('建立事件「' + eventName + '」時發生錯誤：' + e.toString());
        }
      }
    }
    
    return `成功在「${calendar.getName()}」中建立 ${createdEvents} 個事件！`;
  } catch (e) {
    console.error('主程序發生錯誤：', e);
    throw new Error('執行時發生錯誤：' + e.toString());
  }
}

function removeAutoCreatedEvents(calendarId) {
  try {
    const calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      throw new Error('找不到指定的日曆');
    }
    
    const now = new Date();
    const oneYearLater = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000));
    let deletedCount = 0;
    
    const events = calendar.getEvents(now, oneYearLater);
    
    for (let event of events) {
      try {
        const description = event.getDescription() || '';
        if (description.includes('[AutoEventCreator]')) {
          event.deleteEvent();
          deletedCount++;
        }
      } catch (e) {
        console.error('刪除事件時發生錯誤：', e);
      }
    }
    
    return `成功從「${calendar.getName()}」中刪除 ${deletedCount} 個自動建立的事件。`;
  } catch (e) {
    console.error('刪除事件時發生錯誤：', e);
    throw new Error('刪除事件時發生錯誤：' + e.toString());
  }
}

function checkHolidays(startDate, endDate) {
  return {
    isFullWeekHoliday: false
  };
}

function checkCalendarPermissions() {
  try {
    const calendars = CalendarApp.getAllCalendars();
    return calendars.length > 0;
  } catch (e) {
    return false;
  }
}
