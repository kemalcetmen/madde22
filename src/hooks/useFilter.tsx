import { useAppSelector } from '@/store'
import { Event } from "@/types/event"

const useAllFilter = () => {
    const { events } = useAppSelector((state) => state.events)
    const {types, locations, date, search} = useAppSelector((state) => state.filters)

    let newEvents = [...events].filter((event:Event) => {
        return (
            (types.length > 0 ? types.includes(event.type) : true)
            && 
            (locations.length > 0 ? locations.includes(event.location) : true)
            &&
            (event.name.includes(search))
            &&
            (date === 1 ? ( event.date > new Date() ) : true)
            &&
            (date === -1 ? ( event.date < new Date() ) : true)
        )
    })

    return newEvents
}

export default useAllFilter