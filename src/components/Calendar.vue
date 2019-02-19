<template>
  <div class="container is-widescreen">
    <h1 class="title is-centered">
      <span> {{ baseDate.format("MMMM") }}</span>
      <span> {{ baseDate.format("YYYY") }}</span>
    </h1>
    <div class="columns">
      <div
        v-for="(day, i) in days"
        :key="i"
        class="column"
      >
        <strong>{{ day }}</strong>
      </div>
    </div>
    <div
      v-for="(row, index1) in rows"
      :key="index1"
      class="columns is-multiline is-centered is-flex-mobile"
    >
      <div v-for="(column, index2) in columns" :key="index2" :class="{ 'column day borderButton': true, 'other': !monthDays[column + row * 7].isCurrentMonth }">
        <p :class="{ 'tag is-primary is-rounded': isCurrentDay(column, row) }">{{ monthDays[column + row * 7].value }}</p>
      </div>
    </div>

    <button-list :buttons="buttons" @nextMonth="onNextMonth" @beforeMonth="onBeforeMonth"></button-list>
  </div>
</template>

<script>
import ButtonList from "./ButtonList";

export default {
  name: "Calendar",
  components: {ButtonList},
  data() {
    return {
      rows: [0, 1, 2, 3, 4, 5],
      columns: [0, 1, 2, 3, 4, 5, 6],
      days: ["L", "M", "M", "G", "V", "S", "D"],
      selectedDate: null,
      monthDays: [],
      baseDate: null,
      now: null,
      buttons: [
        {
          method: "beforeMonth",
          value: "<<"
        },
        {
          method: "nextMonth",
          value: ">>"
        }
      ]
    }
  },
  created() {
    this.baseDate = this.$moment();
    this.now = this.$moment();
    this.printDayCalendar(this.baseDate);
  },
  computed: {
    weekday() {
      return this.baseDate.startOf("month").weekday();
    },
    currentDay() {
      return this.now && this.now.format("DD")
    },
    currentMonth() {
      return this.now && this.now.format("MM")
    },
    currentYear() {
      return this.now && this.now.format("YYYY")
    },
    prevDate() {
      let base = this.$moment(this.baseDate);
      base = base.set("month", base.month()-1);
      return base;
    },
    nextDate() {
      let base = this.$moment(this.baseDate);
      base = base.set("month", base.month()+1);
      return base;
    }
  },
  methods: {
    printDayCalendar (d) {
      this.monthDays = [];
      let date = this.$moment(d, "DD-MM-YYYY");

      let prevDays = this.prevDate.daysInMonth();
      let nextDays = this.nextDate.daysInMonth();
      /*
      console.log("prev", this.prevDate.format("DD-MM-YYYY"));
      console.log("base", this.baseDate.format("DD-MM-YYYY"));
      console.log("next", this.nextDate.format("DD-MM-YYYY"));
      */

      for (let i = this.weekday - 1; i >= 1; i--) {
        this.monthDays.push({
          value: prevDays-i+1,
          isCurrentMonth: false
        });
      }

      for (let i = 1; i <= date.daysInMonth(); i++) {
        this.monthDays.push({
          value: i,
          isCurrentMonth: true
        });
      }

      let remainingDays = 42 - this.monthDays.length;
      for (let i = remainingDays; i < nextDays; i++) {
        this.monthDays.push({
          value: i-remainingDays+1,
          isCurrentMonth: false
        });
      }
    },
    isCurrentDay(col, row) {
      let toRet = false;
      let day = this.monthDays[col + (row * 7)].value;
      if(day) {
        if (day === parseInt(this.currentDay) && this.currentMonth === this.baseDate.format("MM") && this.currentYear === this.baseDate.format("YYYY")){
          toRet = true;
        }
      }
      return toRet;
    },
    onNextMonth() {
      let month = this.baseDate.month();
      let newDate = this.baseDate.month(month+1);
      this.baseDate = this.$moment(newDate);
      this.printDayCalendar(this.baseDate);
    },
    onBeforeMonth() {
      let month = this.baseDate.month();
      let newDate = this.baseDate.month(month-1);
      this.baseDate = this.$moment(newDate);
      this.printDayCalendar(this.baseDate);
    }
  }
};
</script>

<style scoped>
.day {
  background-color: white;
  border: 1px solid black;
  padding: 40px 10px;
}
.other {
  background-color: lightgray;
}
</style>
