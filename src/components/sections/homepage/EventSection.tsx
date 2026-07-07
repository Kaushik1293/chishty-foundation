'use client'
import { motion, type Variants } from 'framer-motion'
import greenDivider from '../../../assets/images/homepage/vectors/common/green-divider.png'
import star from '../../../assets/images/homepage/vectors/common/faded-star.svg'

import chandelier from '../../../assets/images/homepage/eventsection/chandelier.png'
import event1Img from '../../../assets/images/homepage/eventsection/event-1.png'
import event2Img from '../../../assets/images/homepage/eventsection/event-2.png'
import event3Img from '../../../assets/images/homepage/eventsection/event-3.png'
import event4Img from '../../../assets/images/homepage/eventsection/event-4.png'

import food from '../../../assets/images/homepage/eventsection/food.svg'
import ramadan from '../../../assets/images/homepage/eventsection/iftari.svg'
import music from '../../../assets/images/homepage/eventsection/music.svg'
import urs from '../../../assets/images/homepage/eventsection/urs.svg'

import SectionHeading from '../../common/SectionHeading'
import PrimaryButton from '../../common/PrimaryButton'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.12 },
  }),
}

const events = [
  {
    date: 'FEB 2026',
    image: event1Img,
    icon: food,
    iconBg: 'bg-dark-green',
    title: 'Langar & Food Distribution',
    desc: 'Community Support & Relief Initiatives dedicated to serving those in need with compassion, care, and humanity.',
  },
  {
    date: 'APR 2026',
    image: event2Img,
    icon: ramadan,
    iconBg: 'bg-dark-yellow',
    title: 'Ramadan Iftari Distribution',
    desc: 'Ramadan Iftari Distribution initiative focused on sharing meals, compassion, and support with communities during the holy month of Ramadan.',
  },
  {
    date: 'SEP 2025',
    image: event3Img,
    icon: music,
    iconBg: 'bg-dark-green',
    title: 'International Sufi Rang Festival',
    desc: 'The International Sufi Rang Festival celebrated the spirit of Sufism through soulful music, cultural performances, and a message of peace & love.',
  },
  {
    date: 'JAN 2026',
    image: event4Img,
    icon: urs,
    iconBg: 'bg-dark-yellow',
    title: 'URS Gharib Nawaz (R)',
    desc: 'The Urs of Khwaja Gharib Nawaz (R.A.) brought devotees together in a spiritual gathering filled with prayers, devotion, and the message of …',
  },
]

const CalendarIcon = () => (
  <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.16667 11.6667C0.845833 11.6667 0.571181 11.5524 0.342708 11.324C0.114236 11.0955 0 10.8208 0 10.5V2.33333C0 2.0125 0.114236 1.73785 0.342708 1.50937C0.571181 1.2809 0.845833 1.16667 1.16667 1.16667H1.75V0.583333C1.75 0.418056 1.8059 0.279514 1.91771 0.167708C2.02951 0.0559028 2.16806 0 2.33333 0C2.49861 0 2.63715 0.0559028 2.74896 0.167708C2.86076 0.279514 2.91667 0.418056 2.91667 0.583333V1.16667H7.58333V0.583333C7.58333 0.418056 7.63924 0.279514 7.75104 0.167708C7.86285 0.0559028 8.00139 0 8.16667 0C8.33194 0 8.47049 0.0559028 8.58229 0.167708C8.6941 0.279514 8.75 0.418056 8.75 0.583333V1.16667H9.33333C9.65417 1.16667 9.92882 1.2809 10.1573 1.50937C10.3858 1.73785 10.5 2.0125 10.5 2.33333V10.5C10.5 10.8208 10.3858 11.0955 10.1573 11.324C9.92882 11.5524 9.65417 11.6667 9.33333 11.6667H1.16667ZM1.16667 10.5H9.33333V4.66667H1.16667V10.5ZM5.25 7C5.08472 7 4.94618 6.9441 4.83437 6.83229C4.72257 6.72049 4.66667 6.58194 4.66667 6.41667C4.66667 6.25139 4.72257 6.11285 4.83437 6.00104C4.94618 5.88924 5.08472 5.83333 5.25 5.83333C5.41528 5.83333 5.55382 5.88924 5.66563 6.00104C5.77743 6.11285 5.83333 6.25139 5.83333 6.41667C5.83333 6.58194 5.77743 6.72049 5.66563 6.83229C5.55382 6.9441 5.41528 7 5.25 7ZM2.50104 6.83229C2.38924 6.72049 2.33333 6.58194 2.33333 6.41667C2.33333 6.25139 2.38924 6.11285 2.50104 6.00104C2.61285 5.88924 2.75139 5.83333 2.91667 5.83333C3.08194 5.83333 3.22049 5.88924 3.33229 6.00104C3.4441 6.11285 3.5 6.25139 3.5 6.41667C3.5 6.58194 3.4441 6.72049 3.33229 6.83229C3.22049 6.9441 3.08194 7 2.91667 7C2.75139 7 2.61285 6.9441 2.50104 6.83229ZM7.58333 7C7.41806 7 7.27951 6.9441 7.16771 6.83229C7.0559 6.72049 7 6.58194 7 6.41667C7 6.25139 7.0559 6.11285 7.16771 6.00104C7.27951 5.88924 7.41806 5.83333 7.58333 5.83333C7.74861 5.83333 7.88715 5.88924 7.99896 6.00104C8.11076 6.11285 8.16667 6.25139 8.16667 6.41667C8.16667 6.58194 8.11076 6.72049 7.99896 6.83229C7.88715 6.9441 7.74861 7 7.58333 7ZM5.25 9.33333C5.08472 9.33333 4.94618 9.27743 4.83437 9.16562C4.72257 9.05382 4.66667 8.91528 4.66667 8.75C4.66667 8.58472 4.72257 8.44618 4.83437 8.33438C4.94618 8.22257 5.08472 8.16667 5.25 8.16667C5.41528 8.16667 5.55382 8.22257 5.66563 8.33438C5.77743 8.44618 5.83333 8.58472 5.83333 8.75C5.83333 8.91528 5.77743 9.05382 5.66563 9.16562C5.55382 9.27743 5.41528 9.33333 5.25 9.33333ZM2.50104 9.16562C2.38924 9.05382 2.33333 8.91528 2.33333 8.75C2.33333 8.58472 2.38924 8.44618 2.50104 8.33438C2.61285 8.22257 2.75139 8.16667 2.91667 8.16667C3.08194 8.16667 3.22049 8.22257 3.33229 8.33438C3.4441 8.44618 3.5 8.58472 3.5 8.75C3.5 8.91528 3.4441 9.05382 3.33229 9.16562C3.22049 9.27743 3.08194 9.33333 2.91667 9.33333C2.75139 9.33333 2.61285 9.27743 2.50104 9.16562ZM7.58333 9.33333C7.41806 9.33333 7.27951 9.27743 7.16771 9.16562C7.0559 9.05382 7 8.91528 7 8.75C7 8.58472 7.0559 8.44618 7.16771 8.33438C7.27951 8.22257 7.41806 8.16667 7.58333 8.16667C7.74861 8.16667 7.88715 8.22257 7.99896 8.33438C8.11076 8.44618 8.16667 8.58472 8.16667 8.75C8.16667 8.91528 8.11076 9.05382 7.99896 9.16562C7.88715 9.27743 7.74861 9.33333 7.58333 9.33333Z" fill="#1A6B4E" />
  </svg>
)

const ArrowIcon = ({ color = 'white' }: { color?: string }) => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5955 5.70533H0.718047C0.514281 5.70533 0.343705 5.638 0.206319 5.50333C0.0687728 5.36883 0 5.20182 0 5.00233C0 4.80283 0.0687728 4.63583 0.206319 4.50132C0.343705 4.36666 0.514281 4.29933 0.718047 4.29933H11.5955L8.44351 1.21338C8.30118 1.07387 8.23089 0.9107 8.23265 0.723858C8.23456 0.537015 8.30485 0.370873 8.44351 0.22543C8.59207 0.0801431 8.76265 0.00507699 8.95524 0.00023409C9.148 -0.00460881 9.31865 0.0656914 9.46721 0.211135L13.7551 4.40923C13.8448 4.49703 13.908 4.58959 13.9447 4.68691C13.9816 4.78424 14 4.88938 14 5.00233C14 5.11528 13.9816 5.22041 13.9447 5.31774C13.908 5.41507 13.8448 5.50763 13.7551 5.59543L9.46721 9.79352C9.32472 9.93287 9.15566 10.0017 8.96003 9.99997C8.76424 9.99809 8.59207 9.92451 8.44351 9.77923C8.30485 9.63378 8.23305 9.46912 8.2281 9.28525C8.22315 9.10138 8.29496 8.93672 8.44351 8.79127L11.5955 5.70533Z" fill={color} />
  </svg>
)

const EventSection = () => {
  return (
    <section className="relative pb-25 bg-white overflow-hidden">

      <motion.img
        src={greenDivider.src}
        alt=""
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full h-auto select-none"
      />

      <div className="container mx-auto px-5 md:px-0">
        <div className="grid lg:grid-cols-[0.75fr_auto_auto] gap-10">

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp} custom={0} className='mt-20'>
              <SectionHeading
                align="left"
                eyebrow="UPCOMING EVENTS"
                title={
                  <>
                    Be a Part of <br />
                    <span className="text-dark-yellow">
                      Change in Action
                    </span>
                  </>
                }
                description="Join us in our upcoming events and initiatives as we come together to spread love, support communities, and create lasting impact."
              />
            </motion.div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{
              y: [0, -12, 0],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              y: {
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
            className='flex items-center justify-center'
          >
            <img src={star.src} alt="star" />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6"
          >
            <motion.img
              src={chandelier.src}
              alt="Decorative chandelier"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
              className="w-40 h-auto origin-top select-none"
            />
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <PrimaryButton text="Explore All Events" icon={<ArrowIcon />} />
            </motion.div>
          </motion.div>
        </div>


        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              variants={fadeUp}
              custom={i}
              whileHover={{
                y: -8,
                scale: 1.01,
                boxShadow: "0 8px 24px rgba(201, 151, 74, 0.08)",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group rounded-2xl overflow-hidden bg-[#FDFBF8] border border-[#F8F1EA]"
            >

              <div className="relative h-52 overflow-hidden">
                <motion.img
                  src={event.image.src}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
                <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/60 backdrop-blur-lg text-dark-green text-xs font-semibold px-3 py-1.5 rounded-full">
                  <CalendarIcon />
                  {event.date}
                </span>



              </div>


              <div className="pt-10 pb-6 px-5 relative">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`absolute -top-10 left-5 w-18 h-18 rounded-full flex items-center justify-center border-4 border-[#FDFBF8] ${event.iconBg}`}
                >
                  <img src={event.icon.src} alt="" className="w-8 h-8" />
                </motion.div>

                <h3 className="font-bold font-cormorant text-2xl text-dark-green mb-3">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-px w-14 bg-linear-to-l from-dark-yellow to-transparent" />
                  <span className="w-3 h-3 rotate-45 border border-dark-yellow" />
                  <span className="h-px w-14 bg-linear-to-r from-dark-yellow to-transparent" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 min-h-18">
                  {event.desc}
                </p>

                <a
                  href="#"
                  className="group inline-flex items-center gap-3 text-sm font-semibold text-dark-yellow transition-all duration-300 hover:gap-4"
                >
                  <span>Learn More</span>

                  <motion.span
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-dark-yellow"
                    whileHover={{
                      scale: 1.08,
                      x: 4,
                      boxShadow: "0 0 20px rgba(201,151,74,0.35)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.11685 3.99373H0.502633C0.359997 3.99373 0.240593 3.9466 0.144423 3.85233C0.048141 3.75818 0 3.64128 0 3.50163C0 3.36198 0.048141 3.24508 0.144423 3.15093C0.240593 3.05666 0.359997 3.00953 0.502633 3.00953H8.11685L5.91046 0.849367C5.81083 0.751712 5.76162 0.63749 5.76285 0.5067C5.76419 0.375911 5.8134 0.259611 5.91046 0.157801C6.01445 0.0561002 6.13385 0.00355389 6.26867 0.000163863C6.4036 -0.00322617 6.52306 0.045984 6.62705 0.147794L9.6286 3.08646C9.69138 3.14792 9.73561 3.21271 9.7613 3.28084C9.7871 3.34897 9.8 3.42257 9.8 3.50163C9.8 3.58069 9.7871 3.65429 9.7613 3.72242C9.73561 3.79055 9.69138 3.85534 9.6286 3.9168L6.62705 6.85546C6.5273 6.95301 6.40896 7.00118 6.27202 6.99998C6.13497 6.99867 6.01445 6.94716 5.91046 6.84546C5.8134 6.74365 5.76313 6.62839 5.75967 6.49967C5.75621 6.37096 5.80647 6.2557 5.91046 6.15389L8.11685 3.99373Z" fill="#BD8C3B" />
                    </svg>

                  </motion.span>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default EventSection