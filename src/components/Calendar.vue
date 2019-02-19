<template>
  <div class="container is-widescreen">
    <h1 class="title is-centered">
      <span> {{ momentDate.format("MMMM") }}</span>
      <span> {{ momentDate.format("YYYY") }}</span>
    </h1>
    <div
      v-for="(row, index1) in rows"
      :key="index1"
      class="columns is-multiline is-centered is-flex-mobile"
    >
      <div v-for="(column, index2) in columns" :key="index2" class="column borderButton">
        <p v-if="isCurrentDay(column, row)" class="tag is-primary is-rounded">{{ monthDays[column + row * 7] }}</p>
        <p v-else>{{ monthDays[column + row * 7] }}</p>
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
      selectedDate: null,
      monthDays: [],
      baseDate: new Date(),
      buttons: [
        {
          method: "beforeMonth",
          value: "<<"
        },
        {
          method: "nextMonth",
          value: ">>"
        }
      ],
      currentDay: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      //prevMonthName: this.momentDate.set("month", this.currentMonth + 1).format("DD-MM-YYYY")
    }
  },
  created() {
    this.printDayCalendar(this.baseDate);
  },
  computed: {
    momentDate() {
      return this.$moment(this.baseDate, "DD-MM-YYYY");
    },
    prevDate() {
      let base = this.$moment(this.baseDate);
      base.set("month", base.month()-1);
      return base;
    },
    nextDate() {
      let base = this.$moment(this.baseDate);
      base.set("month", base.month()+1);
      return base;
    }
  },
  methods: {
    printDayCalendar (d) {
      this.monthDays = [];
      let date = this.$moment(d, "DD-MM-YYYY");

      let prevDays = this.prevDate.daysInMonth();
      let nextDays = this.nextDate.daysInMonth();

      for (let i = prevDays-5; i <= prevDays; i++) {
        this.monthDays.push(i);
      }

      for (let i = 1; i <= date.daysInMonth(); i++) {
        this.monthDays.push(i);
      }

      let remainingDays = 42 - this.monthDays.length;
      for (let i = remainingDays; i < nextDays; i++) {
        this.monthDays.push(i-remainingDays+1);
      }

      return date;
    },
    isCurrentDay(col, row) {
      let toRet = false;
      let day = this.monthDays[col + (row * 7)];
      if(day) {
        if (day === this.currentDay && this.currentMonth === this.momentDate.month()){
          toRet = true;
        }
      }
      return toRet;
    },
    onNextMonth() {
      let month = this.momentDate.month();
      this.baseDate = this.momentDate.set("month", month+1);
    },
    onBeforeMonth() {
      let month =this.momentDate.month();
      this.baseDate = this.momentDate.set("month", month-1);
    }
  },
  watch: {
    baseDate: {
      handler(newVal, oldVal) {
        this.printDayCalendar(newVal);
      }
    }
  }
};
</script>

<style scoped></style>
