import { useAppSelector } from '@/store'
import { Event } from "@/types/event"
import { parse, getTime } from 'date-fns'
import turkishLocale from 'date-fns/locale/tr';

const useAllFilter = () => {
    const { events } = useAppSelector((state) => state.events)
    const {types, locations, date, search} = useAppSelector((state) => state.filters)

    let newEvents = [...events].filter((event:Event) => {
        const dateString = event.date.day +" "+ event.date.month +" "+ event.date.year +" "+ event.date.hour
        const dateObject = parse(dateString, 'd MMMM yyyy HH:mm', new Date(),  { locale: turkishLocale });
        const timestamp = getTime(dateObject);
        return (
            (types.length > 0 ? types.includes(event.type) : true)
            && 
            (locations.length > 0 ? locations.includes(event.location) : true)
            &&
            (event.name.toLowerCase().includes(search.toLowerCase()))
            &&
            (date === 1 ? ( new Date(timestamp) > new Date() ) : true)
            &&
            (date === -1 ? ( new Date(timestamp) < new Date() ) : true)
        )
    })

    return newEvents
}

export default useAllFilter