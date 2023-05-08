import { useAppSelector } from '@/store'
import { Event } from "@/types/event"

const useAllFilter = () => {
    const { events } = useAppSelector((state) => state.events)

    let newEvents = [...events].filter((event:Event) => {
        return (event.inCalendar === true )
    })

    return newEvents
}

export default useAllFilter