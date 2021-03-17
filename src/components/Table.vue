<template>
  <div class="flex flex-col">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block min-w-full shadow overflow-hidden rounded sm:rounded-lg border-b border-gray-200"
      >
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              >
                Percent
              </th>
              <th
                class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="activity in activities" v-bind:key="activity.date">
              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-sm text-gray-500 border-gray-200"
              >
                {{ activity.date }}
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-sm text-gray-500 border-gray-200"
              >
                {{ activity.value }}
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b text-gray-400 border-gray-200"
              >
                <div class="w-full fill-current flex items-center justify-end">
                  <svg
                    @click="removeActivity(activity)"
                    class="w-4 h-4 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr>
              <td
                class="px-4 py-2 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-500"
              >
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    v-model="date"
                    type="date"
                    class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="2020-01-01"
                  />
                </div>
              </td>
              <td class="px-4 py-2 whitespace-no-wrap border-b border-gray-200">
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    v-model="percent"
                    pattern="[0-9]*"
                    class="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    :placeholder="maxDate"
                    v-on:keyup.enter="addActivity"
                  />
                </div>
              </td>
              <td class="px-4 py-2 whitespace-no-wrap border-b border-gray-200">
                <div class="mt-1 relative rounded-md shadow-sm">
                  <button
                    type="submit"
                    @click="addActivity"
                    class="group relative w-full flex justify-center py-1 px-3 border border-transparent text-xs sm:text-sm leading-5 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    Add
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import formatISO from "date-fns/formatISO";
import parseISO from "date-fns/parseISO";
import addDays from "date-fns/addDays";
export default {
  name: "Table",
  props: ["activities"],
  data() {
    return {
      date: formatISO(this.suggestedDate(), { representation: "date" }),
      percent: null,
    };
  },
  mounted() {},
  watch: {
    activities() {
      this.date = formatISO(this.suggestedDate(), { representation: "date" });
    },
  },
  methods: {
    addActivity() {
      if (!this.percent){
        return
      }
      this.$emit("addActivity", { date: this.date, value: this.percent });
      this.percent = "";
    },
    removeActivity(activity) {
      this.$emit("removeActivity", activity.date);
    },
    suggestedDate() {
      if (this.activities.length === 0) {
        return new Date();
      }

      let d = parseISO(this.activities[this.activities.length - 1].date);

      return addDays(d, 1);
    },
  },
  computed: {
    maxDate() {
      if (this.activities.length === 0) {
        return "25";
      }
      return this.activities[this.activities.length - 1].value;
    },
  },
};
</script>
<style>
input[type="date"] {
  -webkit-appearance: none;
}
</style>