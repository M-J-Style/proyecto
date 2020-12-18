class Calendar {
  constructor(id) {
          this.cells = [];
          this.currentMonth = 
          this.elCalendar = document.getElementById(id);
          this.showTemplate();
          this.elGridBody =
          this.elCalendar.querySelector('.grid__body');
          this.elMonthName =
          this.elCalendar.querySelector('.MonthName');
          this.showCells();
    }

    showTemplate(){
       this.elCalendar.innerHTML = this.getTemplate();
       this.addEventListenerToControls();
     }

     getTemplate(){
       let template = `
         <div class="calendar__header">
             <button type="button" class="control control--prev">&lt;</button>
             <span class="month-name">Dic 2020</span>
             <button type="button" class="control control--next">&gt;</button>
          </div>
          <div class="calendar_body">
            <div class="grid">
              <div class="grid__header">
                  <span class="grid_cell grid_cell--gh">Lun</span>
                  <span class="grid_cell grid_cell--gh">Mar</span>
                  <span class="grid_cell grid_cell--gh">Mie</span>
                  <span class="grid_cell grid_cell--gh">Jue</span>
                  <span class="grid_cell grid_cell--gh">Vie</span>
                  <span class="grid_cell grid_cell--gh">Sab</span>
                  <span class="grid_cell grid_cell--gh">Dom</span>
              </div>
              <div class="grid__body">

              </div>
            </div>
          </div>
          `;

          return template;
       }

       addEventListenerToControls(){
         let elControls = this.elCalendar.querySelectorAll('.control');
         console.log(elControls);
       }

       showCells(){
          this.cells = this.generateDates(this.currentMonth)
          if (this.cells === null) {
              console.error('No fue posible agendar las fechas del calendario')
              return;
          }
           this.elGridBody.innerHTML = '';
           let templateCells = '';
           for (let i = 0; i < this.cells.length; i++) {
            //<span class ="grid_cell grid__cell--gd grid__cell--selected">1 </span>
            //<span class ="grid_cell grid__cell--gd grid__cell--disabled">1 </span>
                  templateCells += `
                        <span class ="grid_cell grid__cell--gd">
                          ${this.cells[i].date.date()}
                        </span>
            `;
           }

          this.elMonthName.innerHTML =
          this.currentMonth.format('MMM YYYY');
          this.elGridBody.innerHTML = templateCells;

          }

          generateDates(monthToShow = moment()){
            if(!moment.isMoment(monthToShow)){
              return null;
          }

          let dateStart = moment(monthToShow).startOf('month');
          let dateEnd = moment(monthToShow).endOf('month');
          let cells = [];

          //encontrar la primer fehca que se encuentra en el calendario
          while (dateStart.day()!== 1) {
            dateStart.subtract(1, 'days');
          }

          //encontrar la ultima fehca que se encuentra en el calendario
          while (dateStart.day()!== 0) {
            dateEnd.add(1, 'days');
          }

          //generar las fechas del calendario
                do {
                    cells.push({
                      date: moment(dateStart),
                      isInCurrentMonth: dateStart.month() === monthToShow.month()
                    });
                    dateStart.add(1, 'days');
                } while (dateStart.isSameOrBefore(dateEnd));

                    return cells;


        }


}
