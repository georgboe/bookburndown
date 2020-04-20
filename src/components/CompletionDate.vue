<template>
    <div class="h-16 flex items-center content-center rounded shadow-lg text-white bg-gray-800 mt-10">
        <div class="mx-auto text-4xl">{{formattedDate}}</div>
    </div>
</template>
<script>
import formatISO from 'date-fns/formatISO'
export default {
  name: 'CompletionDate',
  props: [
      'date'
  ],
  computed: {
    formattedDate () {
        if (this.date == null) {
            return ''
        }
        return formatISO(this.date, { representation: 'date' })
    }
  }
}
</script>