const filters = document.querySelector("[data-event-filters]");
const groups = document.querySelectorAll("[data-event-group]");
const pastEvents = document.querySelector("[data-past-events]");
const emptyMessage = document.querySelector("[data-event-empty]");

filters.hidden = false;
filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-event-filter]");
    if (!button) return;

    const selected = button.dataset.eventFilter;
    let hasUpcomingOrPast = false;
    for (const control of filters.querySelectorAll("[data-event-filter]")) {
        control.setAttribute("aria-pressed", String(control === button));
    }

    for (const group of groups) {
        let hasMatchingEvent = false;
        for (const row of group.querySelectorAll("[data-event-type]")) {
            const matches = selected === "all" || row.dataset.eventType === selected;
            row.hidden = !matches;
            hasMatchingEvent ||= matches;
        }
        group.hidden = !hasMatchingEvent;
        hasUpcomingOrPast ||= hasMatchingEvent;
    }

    pastEvents.hidden = !pastEvents.querySelector("[data-event-group]:not([hidden])");
    emptyMessage.hidden = hasUpcomingOrPast;
});
