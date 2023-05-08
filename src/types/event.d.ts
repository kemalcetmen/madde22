export interface Event {
    "id": string,
    "name": string,
    "location": string,
    "explanation": string,
    "image": string,
    "date": {
        "day": string,
        "month": string,
        "year": string,
        "hour": string,
        "dayName": string
    },
    "type": string,
    "inCalendar": boolean
}
