import currencyUI from "../views/currency";
import locations from "./locations";

class FavoriteTickets {
    constructor(selector,wrap) {
        this.container = document.querySelector(selector);
        this.wrapper = document.querySelector(wrap);
        this.tickets = [];

        this.container.addEventListener('click', e => this.onClickTicket(e));

        
    }

    onClickTicket(e) {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains("add-favorite")) {
            const id = +target.getAttribute("data-ticket-id");
            const ticket = locations.getTicketById(id);
            console.log(ticket);
            this.tickets.push(ticket);
            this.wrapper.insertAdjacentHTML('afterbegin', this.renderTicket(ticket, currencyUI.getCurrencySymbol()));
        }
    }

    renderTicket(ticket, currency) {
        return `
            <div class="favorite-item  d-flex align-items-start">
                <img
                    src="${ticket.airline_logo}"
                    class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                    <div class="favorite-item-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="favorite-item-city">${ticket.origin_name}</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="favorite-item-city">${ticket.destination_name}</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${ticket.departure_at}</span>
                        <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                    </div>
                    <a data-ticket-id='${ticket.ticket_id}' class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
                </div>
            </div>
        `
    }

    
}

const favorite = new FavoriteTickets('.tickets-sections', '.dropdown-content');

console.log(favorite);

export default favorite;