'use strict';

/*eslint-disable*/

var ScheduleList = [];

var SCHEDULE_CATEGORY = [
    'milestone',
    'task'
];

function ScheduleInfo() {
    this.id = null;
    this.calendarId = null;

    this.title = null;
    this.body = null;
    this.isAllday = true;
    this.start = null;
    this.end = null;
    this.category = '';
    this.dueDateClass = '';

    this.color = null;
    this.bgColor = null;
    this.dragBgColor = null;
    this.borderColor = null;
    this.customStyle = '';

    this.isFocused = false;
    this.isPending = false;
    this.isVisible = true;
    this.isReadOnly = false;
    this.goingDuration = 0;
    this.comingDuration = 0;
    this.recurrenceRule = '';

    // this.raw = {
    //     memo: '',
    //     hasToOrCc: false,
    //     hasRecurrenceRule: false,
    //     location: null,
    //     // class: 'public', // or 'private'
    //     creator: {
    //         name: '',
    //         avatar: '',
    //         company: '',
    //         email: '',
    //         phone: ''
    //     }
    // };
}

function generateTime(schedule, renderStart, renderEnd, data) {
    // var startDate = moment(renderStart.getTime())
    // var endDate = moment(renderEnd.getTime());
    // var diffDate = endDate.diff(startDate, 'days');

   
    var startTest = moment(data[1].sessionEndDate);
    var start2 = startTest.toDate();  
    
    var endTest = moment(data[1].sessionDate);
    var end2 = endTest.toDate();
    
    // schedule.isAllday = chance.bool({likelihood: 30});
    if (schedule.isAllday) {
        schedule.category = 'allday';
    } else if (chance.bool({likelihood: 30})) {
        schedule.category = SCHEDULE_CATEGORY[chance.integer({min: 0, max: 1})];
        if (schedule.category === SCHEDULE_CATEGORY[1]) {
            schedule.dueDateClass = 'morning';
        }
    } else {
        schedule.category = 'time';
    }

    // startDate.add(chance.integer({min: 0, max: diffDate}), 'days');
    // startDate.hours(chance.integer({min: 0, max: 23}))
    // startDate.minutes(chance.bool() ? 0 : 30);
    schedule.start = start2;

    // endDate = moment(startDate);
    // if (schedule.isAllday) {
    //     endDate.add(chance.integer({min: 0, max: 3}), 'days');
    // }

    schedule.end =  end2;
    // schedule.end = endDate
        // .add(chance.integer({min: 1, max: 4}), 'hour')
        // .toDate();

    // if (!schedule.isAllday && chance.bool({likelihood: 20})) {
    //     schedule.goingDuration = chance.integer({min: 30, max: 120});
    //     schedule.comingDuration = chance.integer({min: 30, max: 120});;

    //     if (chance.bool({likelihood: 50})) {
    //         schedule.end = schedule.start;
    //     }
    // }
    console.log('this is star ' + schedule.start);
    console.log('this is end ' + renderEnd);
    console.log('this is test ' + testStart);
    console.log('this is my 1 ' + start2);
    console.log('this is my 2 ' + end2);

}

function generateNames() {
    return;
    var names = [];
    var i = 0;
    var length = chance.integer({min: 1, max: 10});

    for (; i < length; i += 1) {
        names.push(chance.name());
    }

    return names;
}

function generateRandomSchedule(calendar, renderStart, renderEnd) {
    return;
    var schedule = new ScheduleInfo();

    schedule.id = chance.guid();
    schedule.calendarId = calendar.id;

    schedule.title = chance.sentence({words: 3});
    schedule.body = chance.bool({likelihood: 20}) ? chance.sentence({words: 10}) : '';
    schedule.isReadOnly = chance.bool({likelihood: 20});
    generateTime(schedule, renderStart, renderEnd);

    schedule.isPrivate = chance.bool({likelihood: 10});
    schedule.location = chance.address();
    schedule.attendees = chance.bool({likelihood: 70}) ? generateNames() : [];
    schedule.recurrenceRule = chance.bool({likelihood: 20}) ? 'repeated events' : '';

    schedule.color = calendar.color;
    schedule.bgColor = calendar.bgColor;
    schedule.dragBgColor = calendar.dragBgColor;
    schedule.borderColor = calendar.borderColor;

    if (schedule.category === 'milestone') {
        schedule.color = schedule.bgColor;
        schedule.bgColor = 'transparent';
        schedule.dragBgColor = 'transparent';
        schedule.borderColor = 'transparent';
    }

    schedule.raw.memo = chance.sentence();
    schedule.raw.creator.name = chance.name();
    schedule.raw.creator.avatar = chance.avatar();
    schedule.raw.creator.company = chance.company();
    schedule.raw.creator.email = chance.email();
    schedule.raw.creator.phone = chance.phone();

    if (chance.bool({ likelihood: 20 })) {
        var travelTime = chance.minute();
        schedule.goingDuration = travelTime;
        schedule.comingDuration = travelTime;
    }

    ScheduleList.push(schedule);
}

//function generateRandomSchedule1(calendar, renderStart, renderEnd, title, body, data) {
function generateRandomSchedule1(calendar, renderStart, renderEnd, i, data) {

    var schedule = new ScheduleInfo();

    schedule.id = data[i].courseName;                  // Not Sure ?????????????????????????
    schedule.calendarId = calendar.id;//<-- dont touch

    schedule.title = data[i].courseName;
    schedule.body = data[i].firstName;
    schedule.location = data[i].location;
    schedule.isPrivate = false;
    schedule.isReadOnly = true;
    schedule.start = renderStart;
    schedule.end = renderEnd;
    
   // generateTime(schedule, renderStart, renderEnd, data);
    ////////////////////////////////////////////////
    var startTest = moment(data[i].sessionEndDate);
    var start2 = startTest.toDate();  
    
    var endTest = moment(data[i].sessionDate);
    var end2 = endTest.toDate();
    
    // schedule.isAllday = chance.bool({likelihood: 30});
    if (schedule.isAllday) {
        schedule.category = 'allday';
    } else if (chance.bool({likelihood: 30})) {
        schedule.category = SCHEDULE_CATEGORY[chance.integer({min: 0, max: 1})];
        if (schedule.category === SCHEDULE_CATEGORY[1]) {
            schedule.dueDateClass = 'morning';
        }
    } else {
        schedule.category = 'time';
    }

    schedule.start = start2;
    schedule.end =  end2;
    // schedule.end = endDate

    // console.log('this is star ' + schedule.start);
    // console.log('this is end ' + renderEnd);
    // console.log('this is test ' + testStart);
    // console.log('this is my 1 ' + start2);
    // console.log('this is my 2 ' + end2);
    console.log(i + " start at " + start2 + " ending at " + end2 );
    // console.log(data);

    ///////////////////////////////////////////
    // schedule.attendees = chance.bool({likelihood: 70}) ? generateNames() : []; // Please Decide later *********

    schedule.color = calendar.color;
    schedule.bgColor = calendar.bgColor;
    schedule.dragBgColor = calendar.dragBgColor;
    schedule.borderColor = calendar.borderColor;

    if (schedule.category === 'milestone') {
        schedule.color = schedule.bgColor;
        schedule.bgColor = 'transparent';
        schedule.dragBgColor = 'transparent';
        schedule.borderColor = 'transparent';
    }

    ScheduleList.push(schedule);
    return schedule
}

// function generateSchedule(viewName, renderStart, renderEnd) {
//     ScheduleList = [];
//     CalendarList.forEach(function(calendar) {
//         var i = 0, length = 10;
//         if (viewName === 'month') {
//             length = 3;
//         } else if (viewName === 'day') {
//             length = 4;
//         }
//         for (; i < length; i += 1) {
//             generateRandomSchedule(calendar, renderStart, renderEnd);
//         }
//     });
// }
function generateSchedule(viewName, renderStart, renderEnd) {
    return;
    ScheduleList = [];
    CalendarList.forEach(function(calendar) {
        var i = 0, length = 10;
        if (viewName === 'month') {
            length = 3;
        } else if (viewName === 'day') {
            length = 4;
        }
        for (; i < length; i += 1) {
            let data = generateRandomSchedule1(calendar, renderStart, renderEnd);
        }
    });
}

function generateSchedule1(viewName, renderStart, renderEnd, data, testStart) {
    ScheduleList = [];
    // console.log(data)
    // let calendar = CalendarList[1]
    // let i = 0, length = 10;
    // for (; i < length; i += 1) {
    //     let retdata = generateRandomSchedule1(calendar, renderStart, renderEnd);
    //     retdata.title = data[0].courseName
    // }
    CalendarList.forEach(function(calendar, idx) {
        // console.log(idx)
        var i = 0, length = 50;
        // if (viewName === 'month') {
        //     length = 3;
        // } else if (viewName === 'day') {
        //     length = 4;
        // }
        for (; i < length; i++) {
            // let End = data[i].sessionEndDate;
            // let Start = data[i].sessionDate;
            // let retdata = generateRandomSchedule1(calendar, renderStart, renderEnd, data[i].courseName, data[i].firstName, data);
            let retdata = generateRandomSchedule1(calendar, renderStart, renderEnd,i, data);
            // let retdata = generateRandomSchedule1(calendar, data[i].sessionDate, data[i].sessionEndDate, data[i].courseName, data[i].firstName);

            // retdata.title = data[0].courseName
        }
        /*
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[idx].length;j++){
                //javascript
                generateRandomSchedule1(calendar, renderStart, renderEnd, data[i][j].courseName, data[i][j].firstName);
            }
        }
        */
    });
    // console.log(data);
    // var myTest = data.sessionEndDate.getTime();
    // console.log('this is my test ' + myTest);


    // console.log('this is star ' + renderStart);
    // console.log('this is end ' + renderEnd);
    // console.log('this is test ' + testStart);
}