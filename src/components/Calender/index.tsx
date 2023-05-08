import React, { useState } from 'react';
import Modal from 'react-modal';
import useCalender from '@/hooks/useCalender'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    startOfToday,
} from 'date-fns'
import turkishLocale from 'date-fns/locale/tr'
import Image from 'next/image';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Calender = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>
                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7.63636V18H0V7.63636H20ZM5 0V1.63636H3.88889V4.36364H5V1.63636H9.44444V0H10.5556V1.63636H9.44444V4.36364H10.5556V1.63636H15V0H16.1111V1.63636H15V4.36364H16.1111V1.63636H20V6.54545H0V1.63636H3.88889V0H5Z" fill="black" />
                </svg>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <Example />
            </Modal>
        </div>
    );
}
export default Calender

function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}

function Example() {

    const events = useCalender()

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayEvents = events.filter((event) =>
        isSameDay(parse(event.date.day + " " + event.date.month + " " + event.date.year, "dd MMMM yyyy", new Date(), { locale: turkishLocale }), selectedDay)
    )

    return (
        <div className="pt-16 relative z-50">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                    <div className="md:pr-14 h-[408px]">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: turkishLocale })}
                            </h2>
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                            <div>Pz</div>
                            <div>Pzt</div>
                            <div>Salı</div>
                            <div>Çar</div>
                            <div>Per</div>
                            <div>Cu</div>
                            <div>Cmt</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) &&
                                            isToday(day) &&
                                            'text-red-500',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                            isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            'bg-gray-900',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>

                                    <div className="w-1 h-1 mx-auto mt-1">
                                        {events.some((event) =>
                                            isSameDay(parse(event.date.day + " " + event.date.month + " " + event.date.year, "dd MMMM yyyy", new Date(), { locale: turkishLocale }), day)
                                        ) && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <section className="mt-12 md:mt-0 md:pl-14">
                        <h2 className="font-semibold text-gray-900">
                            Schedule for{' '}
                            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                {format(selectedDay, 'MMM dd, yyy')}
                            </time>
                        </h2>
                        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 w-[224px] md:w-[280px]">
                            {selectedDayEvents.length > 0 ? (
                                selectedDayEvents.map((event, i) => (
                                    <Meeting event={event} key={i} />
                                ))
                            ) : (
                                <p>No meetings for today.</p>
                            )}
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    )
}

function Meeting({ event }: any) {
    console.log("event", event)
    return (
        <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <Image
                src={event?.image}
                alt=""
                width={60}
                height={60}
                className="flex-none rounded-lg object-cover	"
            />
            <div className="flex-auto">
                <p className="text-gray-900 line-clamp-1">{event.name}</p>
                <p className="mt-0.5">
                    <time dateTime={event.startDatetime}>
                        {/* {format(startDateTime, 'h:mm a')} */}
                        {format(parse(event.date.day + " " + event.date.month + " " + event.date.year + " " + event.date.hour, "dd MMMM yyyy HH:mm", new Date(), { locale: turkishLocale }), 'h:mm a')}
                    </time>
                </p>
            </div>
        </li>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
