<template>
  <div>
    <div class="container text-left">
      <div id="calendario" />
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import jQuery from 'jquery'
import {} from 'evo-calendar'
Vue.prototype.jQuery = jQuery

export default {

  data () {
    return {
      user: {
        fullname: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        age: ''
      }
    }
  },
  mounted () {
    jQuery('#calendario').evoCalendar({
      // format:'yyyy-mm-dd',
      sidebarDisplayDefault: false,
      eventDisplayDefault: true,
      language: 'es',
      calendarEvents: [
        {
          id: 'bHay68s', // Event's ID (required)
          name: 'New Year', // Event name (required)
          date: 'December/1/2022', // Event date (required)
          type: 'holiday', // Event type (required)
          everyYear: true // Same event every year (optional)
        },
        {
          name: 'Vacation Leave',
          badge: '02/13 - 02/15', // Event badge (optional)
          date: ['February/13/2022', 'February/15/2022'], // Date range
          description: 'Vacation leave for 3 days.', // Event description (optional)
          type: 'event',
          color: '#63d867' // Event custom color (optional)
        }
      ]
    })
  }
}

</script>
<style>
  @import './../assets/css/evo-calendar.css';
</style>
