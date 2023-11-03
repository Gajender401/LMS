'use client'
import { Navbar } from '@/app/(dashboard)/_components/navbar'
import { Sidebar } from '@/app/(dashboard)/_components/sidebar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './loader'

function Dashbord({redirectUrl}:{redirectUrl:string}) {

  const [appplicton, setAppplicton] = useState(false)
    
    async function fetchApplication() {
        const res = await axios.get('/api/user')
        console.log(res.data);
        setAppplicton(res.data)
      }

      useEffect(() => {
        fetchApplication()
      console.log(redirectUrl);

      }, [])

      

      if (redirectUrl) return <Loader />

  return (
    <div className="h-full bg-white ">

    <Navbar />

    <div className="dash-board flex flex-row">
      <div className="hidden lg:w-1/4 xl:w-1/5 lg:flex ">
        <div className="left-side ml-8 mr-4 mt-10 mb-8">
          <Sidebar />
          <div className="ml-4">
            <div className="mt-4 md:mt-0 -ml-10 pt-2 pb-2">
              <a href="">
                <img
                  src="/Group 1410097013.png"
                  alt="" width="280px" height="230px"
                />
              </a>
            </div>
            <div className="mt-8 mb-8">
              <a
                href=""
                className="flex flex-row items-center text-gray-200 hover:text-white transition duration-200 ease-in-out"
              >
                <img src="/Mask group.png" alt="" />
                <span className="font-medium text-lg ml-2">Settings</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="right-side w-full lg:w-3/4 xl:w-4/5 mr-4 lg:mr-8 ml-4 mt-10 mb-8">
        <div className="welcome-sect w- bg-red-400">
          <div className="flex flex-col justify-between md:flex md:flex-row md:justify-between">
            <div className="pt-0 md:pt-10 pl-4 pr-4 md:pl-10 pb-0 md:pb-10 md:pr-10 text-center md:text-left">
              <p className="welcome-text hidden md:inline-block">
                October 29, 2023
              </p>
              <h1 className="welcome-header text-white text-2xl md:text-3xl lg:text-2xl xl:text-3xl mt-10">
                Welcome back, John!
              </h1>
              <p className="welcome-text text-sm">
                Always stay updated in your Learners portal
              </p>
            </div>
            <div className="pr-0 mx-auto md:mx-0 lg:pr-10">
              <img
                src="/Saly-10.png"
                alt=""
                width="289px"
                height="289px"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex md:flex-row mt-4">
          <div className="continue-sect w-full md:w-1/2 pl-0 md:pl-10 md:pr-10 xl:pl-2 xl:pr-2 pt-4 pb-4">
            <h1 className="text-xl font-medium mb-2 xl:pl-5 text-center xl:text-left">
              Continue Watching
            </h1>
            <div className="m-2 md:mt-2 lg:mt-4 flex flex-row justify-center xl:flex xl:flex-row xl:justify-between">
              <img
                src="/Rectangle 39834.png"
                alt=""
                width="285px"
                height="158px"
                className=""
              />
              <img
                src="/Rectangle 39835.png"
                alt=""
                width="174px"
                height="158px"
                className="hidden xl:block"
              />
            </div>
          </div>
          <div className="h-40 w-full md:w-1/2 mb-4 md:mb-0">
            <div className="pro-cont pl-2 md:pl-8 lg:pl-10 pt-4 pb-4">
              <h1 className="text-xl mb-2">Today's Progress</h1>
              <div className="progress-bar mt-10 md:mt-20"></div>
              <div className="progress-bar-inner mt-10 md:mt-20 shadow-2xl pl-4 pt-2 md:pt-4">
                <h1 className="font-normal text-sm md:text-normal">
                  Project Management 2
                </h1>
                <div className="mt-5 md:mt-8 pb-2 lg:mt-8 flex flex-row items-center">
                  <p className="font-semibold mr-1">
                    75<small>%</small>
                  </p>
                  <svg
                    width="201"
                    height="18"
                    viewBox="0 0 201 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="201"
                      height="17.4064"
                      rx="8.70321"
                      fill="#4E47BB"
                      fill-opacity="0.39"
                    />
                  </svg>

                  <p className="play-btn-text text-xs md:text-normal">
                    In progress
                  </p>
                </div>
              </div>
              <a href="">
                <div className="progress-bar-play mt-10 md:mt-20 flex items-center shadow-2xl">
                  <img
                    src="/Vector.png"
                    alt=""
                    className="mx-auto"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* desktop start */}
        <section className="hidden lg:block">
          <div className="flex flex-col md:flex md:flex-row mt-4">
            <div className="stat-sect w-1/3 bg-white mr-2 pl-4 xl:pl-8 pr-4 pt-4">
              <div className=" flex flex-row justify-between">
                <div>
                  <h1 className="text-xl">Statistics</h1>
                </div>
                <div>
                  <select name="" id="" className="stat-month">
                    <option value="">2018</option>
                    <option value="">2019</option>
                    <option value="">2020</option>
                    <option value="">2021</option>
                    <option value="">2022</option>
                    <option value="">2023</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row items-center mt-10">
                <div className="flex flex-col">
                  <span className="text-sm mt-2">800</span>
                  <span className="text-sm mt-2">600</span>
                  <span className="text-sm mt-2">400</span>
                  <span className="text-sm mt-2">200</span>
                  <span className="text-sm mt-2">0</span>
                </div>
                <div className="flex flex-row items-end ml-1 xl:ml-2 mt-10">
                  <div className="hidden xl:block xl:mr-4 lg:mr-2 text-center flex flex-col items-center">
                    <svg
                      width="24"
                      height="33"
                      viewBox="0 0 24 33"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V33H0V4Z"
                        fill="#EFF2FF"
                      />
                    </svg>
                    <span className="mt-2 text-sm">2017</span>
                  </div>
                  <div className="xl:mr-4 lg:mr-2 text-center flex flex-col items-center">
                    <svg
                      width="24"
                      height="96"
                      viewBox="0 0 24 96"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V96H0V4Z"
                        fill="#EFF2FF"
                      />
                    </svg>
                    <span className="mt-2 text-sm">2018</span>
                  </div>
                  <div className="xl:mr-4 lg:mr-2 text text-center flex flex-col items-center">
                    <svg
                      width="24"
                      height="65"
                      viewBox="0 0 24 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V65H0V4Z"
                        fill="#EFF2FF"
                      />
                    </svg>
                    <span className="mt-2 text-sm">2019</span>
                  </div>
                  <div className="xl:mr-4 lg:mr-2 text text-center flex flex-col items-center">
                    <svg
                      width="24"
                      height="99"
                      viewBox="0 0 24 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V99H0V4Z"
                        fill="#925FE2"
                      />
                    </svg>
                    <span className="mt-2 text-sm">2020</span>
                  </div>
                  <div className="xl:mr-4 lg:mr-2 text text-center flex flex-col items-center">
                    <svg
                      width="24"
                      height="120"
                      viewBox="0 0 24 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V120H0V4Z"
                        fill="#EFF2FF"
                      />
                    </svg>
                    <span className="mt-2 text-sm">2021</span>
                  </div>
                  <div className="xl:mr-4 lg:mr-2 text text-center flex flex-col items-center">
                    <svg
                      width="24"
                      height="96"
                      viewBox="0 0 24 96"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V96H0V4Z"
                        fill="#EFF2FF"
                      />
                    </svg>
                    <span className="mt-2 text-sm">2022</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="act-sect w-1/5 flex flex-col items-center bg-white mr-2 pt-2 pb-2">
              <h1 className="text-center text-xl pl-1 pr-1">Course Activities</h1>
              <div className="mx-auto my-auto">
                <svg
                  width="166"
                  height="166"
                  viewBox="0 0 166 166"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M67.47 25.0442C99.478 16.4677 132.378 35.4626 140.955 67.4706C149.531 99.4785 130.536 132.379 98.5283 140.955C66.5204 149.532 33.6202 130.537 25.0436 98.5289C16.4671 66.5209 35.4621 33.6207 67.47 25.0442ZM97.0397 135.4C125.979 127.645 143.154 97.8989 135.399 68.9592C127.645 40.0195 97.8984 22.8454 68.9587 30.5997C40.0189 38.3541 22.8448 68.1005 30.5992 97.0402C38.3536 125.98 68.1 143.154 97.0397 135.4Z"
                    fill="#EFF2FF"
                  />
                  <path
                    d="M68.9751 30.661C67.1433 23.8247 71.2178 16.6649 78.2778 16.1662C87.517 15.5136 96.8394 16.7806 105.644 19.9424C118.492 24.5563 129.624 32.9849 137.55 44.0998C145.476 55.2148 149.818 68.4857 149.994 82.136C150.17 95.7864 146.172 109.165 138.535 120.48C130.898 131.796 119.987 140.509 107.262 145.452C94.5369 150.396 80.6055 151.334 67.3324 148.142C54.0594 144.95 42.0782 137.78 32.9927 127.591C26.7666 120.608 22.1039 112.437 19.2526 103.625C17.0739 96.8907 22.1894 90.4335 29.2146 89.5747C36.2398 88.7159 42.4602 93.8697 45.4197 100.299C47.1245 104.002 49.3772 107.455 52.122 110.533C57.732 116.824 65.13 121.252 73.3256 123.223C81.5212 125.194 90.1233 124.614 97.9805 121.562C105.838 118.509 112.575 113.13 117.29 106.143C122.006 99.1557 124.474 90.895 124.366 82.4664C124.257 74.0378 121.576 65.8436 116.682 58.9805C111.788 52.1174 104.915 46.9131 96.9814 44.0642C93.0999 42.6703 89.0554 41.8728 84.983 41.6773C77.9136 41.3379 70.8069 37.4974 68.9751 30.661Z"
                    fill="#925FE2"
                  />
                </svg>
                <h1 className="text-center">
                  75<small>%</small>
                </h1>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-row items-center md:pl-1 md:pr-1 xl:pl-2 xl:pr-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#925FE2" />
                  </svg>
                  <span className="text-xs ml-1 font-medium">Process</span>
                </div>
                <div className="flex flex-row items-center md:pl-1 md:pr-1 xl:pl-2 xl:pr-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#E8F3FF" />
                  </svg>
                  <span className="text-xs ml-1 font-medium">In Process</span>
                </div>
              </div>
            </div>
            <div className="ment-sect flex flex-col justify-between w-1/2 bg-white pt-2 pb-2 pl-8 pr-8">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <h1 className="text-xl">Mentor Chart</h1>
                </div>
                <div className="ment-sup flex flex-row items-center pl-4">
                  <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4853 14.5872C14.5789 14.5872 16.1261 14.5872 17.0868 13.6257C18.0483 12.6651 18.0483 11.1178 18.0483 8.02419C18.0483 4.93056 18.0483 3.38333 17.0868 2.42267C16.1261 1.46119 14.5789 1.46119 11.4853 1.46119H8.20375C5.11011 1.46119 3.56289 1.46119 2.60223 2.42267C1.64075 3.38333 1.64075 4.93056 1.64075 8.02419C1.64075 11.1178 1.64075 12.6651 2.60223 13.6257C3.13793 14.1622 3.85576 14.3993 4.92225 14.5035"
                      stroke="white"
                      stroke-width="1.64075"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.4853 14.5872C10.4713 14.5872 9.35394 14.9974 8.33422 15.5265C6.69511 16.3773 5.87555 16.803 5.47193 16.5315C5.0683 16.2608 5.1446 15.4199 5.29801 13.7389L5.33246 13.3566"
                      stroke="white"
                      stroke-width="1.64075"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span className="text-white pl-1">Support</span>
                </div>
              </div>
              <div className="mx-auto my-auto">
                <div className="ment-msg">
                  <svg
                    width="239"
                    height="74"
                    viewBox="0 0 239 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_7_1111)">
                      <rect
                        x="9"
                        y="9"
                        width="221"
                        height="55.685"
                        rx="8.70079"
                        fill="#F4F4F4"
                      />
                    </g>
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <circle
                      cx="36.4075"
                      cy="36.4075"
                      r="15.6614"
                      stroke="#925FE2"
                      stroke-width="2.61024"
                    />
                    <circle
                      cx="36.8425"
                      cy="36.8425"
                      r="4.35039"
                      fill="#925FE2"
                    />
                    <defs>
                      <filter
                        id="filter0_d_7_1111"
                        x="0.125197"
                        y="0.125197"
                        width="238.75"
                        height="73.4346"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feMorphology
                          radius="0.174016"
                          operator="dilate"
                          in="SourceAlpha"
                          result="effect1_dropShadow_7_1111"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="4.35039" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_7_1111"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_7_1111"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
                <div className="ment-msg1">
                  <svg
                    width="239"
                    height="74"
                    viewBox="0 0 239 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g filter="url(#filter0_d_7_1111)">
                      <rect
                        x="9"
                        y="9"
                        width="221"
                        height="55.685"
                        rx="8.70079"
                        fill="#F4F4F4"
                      />
                    </g>
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="64.6851"
                      y="19.4409"
                      width="148.783"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <rect
                      x="63.8149"
                      y="37.7126"
                      width="57.4252"
                      height="13.0512"
                      rx="6.52559"
                      fill="#DADADA"
                    />
                    <circle
                      cx="36.4075"
                      cy="36.4075"
                      r="15.6614"
                      stroke="#925FE2"
                      stroke-width="2.61024"
                    />
                    <circle
                      cx="36.8425"
                      cy="36.8425"
                      r="4.35039"
                      fill="#925FE2"
                    />
                    <defs>
                      <filter
                        id="filter0_d_7_1111"
                        x="0.125197"
                        y="0.125197"
                        width="238.75"
                        height="73.4346"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB"
                      >
                        <feFlood
                          flood-opacity="0"
                          result="BackgroundImageFix"
                        />
                        <feColorMatrix
                          in="SourceAlpha"
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                          result="hardAlpha"
                        />
                        <feMorphology
                          radius="0.174016"
                          operator="dilate"
                          in="SourceAlpha"
                          result="effect1_dropShadow_7_1111"
                        />
                        <feOffset />
                        <feGaussianBlur stdDeviation="4.35039" />
                        <feComposite in2="hardAlpha" operator="out" />
                        <feColorMatrix
                          type="matrix"
                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                        />
                        <feBlend
                          mode="normal"
                          in2="BackgroundImageFix"
                          result="effect1_dropShadow_7_1111"
                        />
                        <feBlend
                          mode="normal"
                          in="SourceGraphic"
                          in2="effect1_dropShadow_7_1111"
                          result="shape"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add a Comment"
                  className="ment-input pl-10 w-full border border-gray-300 focus:border-violet-900 focus:outline-none focus:ring focus:ring-violet-100"
                />
              </div>
            </div>
          </div>
        </section>
        {/* desktop end */}

        {/* mobile start*/}
        <section className="flex flex-row lg:hidden mt-4">
          <div className="stat-sect w-4/6 bg-white mr-4 pl-2 md:pl-8 pt-2 pb-2">
            <div className=" flex flex-row justify-between">
              <div>
                <h1 className="text-xl">Statistics</h1>
              </div>
              <div className="pr-5">
                <select name="" id="" className="stat-month">
                  <option value="">2017</option>
                  <option value="">2018</option>
                  <option value="">2019</option>
                  <option value="">2020</option>
                  <option value="">2021</option>
                  <option value="">2022</option>
                  <option value="">2023</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row items-center mt-4 md:mt-4">
              <div className="flex flex-col">
                <span className="mt-1 md:mt-2 text-xs md:text-lg">800</span>
                <span className="mt-1 md:mt-2 text-xs md:text-lg">600</span>
                <span className="mt-1 md:mt-2 text-xs md:text-lg">400</span>
                <span className="mt-1 md:mt-2 text-xs md:text-lg">200</span>
                <span className="mt-1 md:mt-2 text-xs md:text-lg">0</span>
              </div>
              <div className="flex flex-row items-end ml-2 md:ml-4 md:mt-10">
                <div className="mr-1 md:mr-4 text-center flex flex-col items-center">
                  <svg
                    width="24"
                    height="33"
                    viewBox="0 0 24 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V33H0V4Z"
                      fill="#EFF2FF"
                    />
                  </svg>
                  <span className="mt-1 md:mt-2 text-xs md:text-lg">
                    2017
                  </span>
                </div>
                <div className="mr-1 md:mr-4 text-center flex flex-col items-center">
                  <svg
                    width="24"
                    height="96"
                    viewBox="0 0 24 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V96H0V4Z"
                      fill="#EFF2FF"
                    />
                  </svg>
                  <span className="mt-1 md:mt-2 text-xs md:text-lg">
                    2018
                  </span>
                </div>
                <div className="mr-1 md:mr-4 text-center flex flex-col items-center">
                  <svg
                    width="24"
                    height="65"
                    viewBox="0 0 24 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V65H0V4Z"
                      fill="#EFF2FF"
                    />
                  </svg>
                  <span className="mt-1 md:mt-2 text-xs md:text-lg">
                    2019
                  </span>
                </div>
                <div className="mr-1 md:mr-4 text-center flex flex-col items-center">
                  <svg
                    width="24"
                    height="99"
                    viewBox="0 0 24 99"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V99H0V4Z"
                      fill="#925FE2"
                    />
                  </svg>
                  <span className="mt-1 md:mt-2 text-xs md:text-lg">
                    2020
                  </span>
                </div>
                <div className="mr-1 md:mr-4 text-center flex flex-col items-center">
                  <svg
                    width="24"
                    height="120"
                    viewBox="0 0 24 120"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V120H0V4Z"
                      fill="#EFF2FF"
                    />
                  </svg>
                  <span className="mt-1 md:mt-2 text-xs md:text-lg">
                    2021
                  </span>
                </div>
                <div className="mr-1 md:mr-4 text-center flex flex-col items-center">
                  <svg
                    width="24"
                    height="96"
                    viewBox="0 0 24 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V96H0V4Z"
                      fill="#EFF2FF"
                    />
                  </svg>
                  <span className="mt-1 md:mt-2 text-xs md:text-lg">
                    2022
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="act-sect w-2/6 flex flex-col items-center bg-white pt-2 pb-2">
            <h1 className="text-center text-sm md:text-lg">
              Course Activities
            </h1>
            <div className="mx-auto my-auto md:hidden">
              <svg
                width="78"
                height="79"
                viewBox="0 0 166 166"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M67.47 25.0442C99.478 16.4677 132.378 35.4626 140.955 67.4706C149.531 99.4785 130.536 132.379 98.5283 140.955C66.5204 149.532 33.6202 130.537 25.0436 98.5289C16.4671 66.5209 35.4621 33.6207 67.47 25.0442ZM97.0397 135.4C125.979 127.645 143.154 97.8989 135.399 68.9592C127.645 40.0195 97.8984 22.8454 68.9587 30.5997C40.0189 38.3541 22.8448 68.1005 30.5992 97.0402C38.3536 125.98 68.1 143.154 97.0397 135.4Z"
                  fill="#EFF2FF"
                />
                <path
                  d="M68.9751 30.661C67.1433 23.8247 71.2178 16.6649 78.2778 16.1662C87.517 15.5136 96.8394 16.7806 105.644 19.9424C118.492 24.5563 129.624 32.9849 137.55 44.0998C145.476 55.2148 149.818 68.4857 149.994 82.136C150.17 95.7864 146.172 109.165 138.535 120.48C130.898 131.796 119.987 140.509 107.262 145.452C94.5369 150.396 80.6055 151.334 67.3324 148.142C54.0594 144.95 42.0782 137.78 32.9927 127.591C26.7666 120.608 22.1039 112.437 19.2526 103.625C17.0739 96.8907 22.1894 90.4335 29.2146 89.5747C36.2398 88.7159 42.4602 93.8697 45.4197 100.299C47.1245 104.002 49.3772 107.455 52.122 110.533C57.732 116.824 65.13 121.252 73.3256 123.223C81.5212 125.194 90.1233 124.614 97.9805 121.562C105.838 118.509 112.575 113.13 117.29 106.143C122.006 99.1557 124.474 90.895 124.366 82.4664C124.257 74.0378 121.576 65.8436 116.682 58.9805C111.788 52.1174 104.915 46.9131 96.9814 44.0642C93.0999 42.6703 89.0554 41.8728 84.983 41.6773C77.9136 41.3379 70.8069 37.4974 68.9751 30.661Z"
                  fill="#925FE2"
                />
              </svg>
            </div>
            <div className="mx-auto my-auto hidden md:block">
              <svg
                width="115"
                height="132"
                viewBox="0 0 166 166"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M67.47 25.0442C99.478 16.4677 132.378 35.4626 140.955 67.4706C149.531 99.4785 130.536 132.379 98.5283 140.955C66.5204 149.532 33.6202 130.537 25.0436 98.5289C16.4671 66.5209 35.4621 33.6207 67.47 25.0442ZM97.0397 135.4C125.979 127.645 143.154 97.8989 135.399 68.9592C127.645 40.0195 97.8984 22.8454 68.9587 30.5997C40.0189 38.3541 22.8448 68.1005 30.5992 97.0402C38.3536 125.98 68.1 143.154 97.0397 135.4Z"
                  fill="#EFF2FF"
                />
                <path
                  d="M68.9751 30.661C67.1433 23.8247 71.2178 16.6649 78.2778 16.1662C87.517 15.5136 96.8394 16.7806 105.644 19.9424C118.492 24.5563 129.624 32.9849 137.55 44.0998C145.476 55.2148 149.818 68.4857 149.994 82.136C150.17 95.7864 146.172 109.165 138.535 120.48C130.898 131.796 119.987 140.509 107.262 145.452C94.5369 150.396 80.6055 151.334 67.3324 148.142C54.0594 144.95 42.0782 137.78 32.9927 127.591C26.7666 120.608 22.1039 112.437 19.2526 103.625C17.0739 96.8907 22.1894 90.4335 29.2146 89.5747C36.2398 88.7159 42.4602 93.8697 45.4197 100.299C47.1245 104.002 49.3772 107.455 52.122 110.533C57.732 116.824 65.13 121.252 73.3256 123.223C81.5212 125.194 90.1233 124.614 97.9805 121.562C105.838 118.509 112.575 113.13 117.29 106.143C122.006 99.1557 124.474 90.895 124.366 82.4664C124.257 74.0378 121.576 65.8436 116.682 58.9805C111.788 52.1174 104.915 46.9131 96.9814 44.0642C93.0999 42.6703 89.0554 41.8728 84.983 41.6773C77.9136 41.3379 70.8069 37.4974 68.9751 30.661Z"
                  fill="#925FE2"
                />
              </svg>
              <h1 className="text-center">
                75<small>%</small>
              </h1>
            </div>
            <div className="flex flex-col md:flex md:flex-row justify-center">
              <div className="flex flex-row items-center md:pl-2 md:pr-2 xl:pl-4 xl:pr-4">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="6" fill="#925FE2" />
                </svg>
                <span className="text-xs ml-1 font-medium">Process</span>
              </div>
              <div className="flex flex-row items-center md:pl-2 md:pr-2 xl:pl-4 xl:pr-4">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="6" fill="#E8F3FF" />
                </svg>
                <span className="text-xs ml-1 font-medium">In Process</span>
              </div>
            </div>
          </div>
        </section>
        {/* mobile end */}

        {/* mobile start */}
        <section className="flex flex-col md:flex md:flex-row lg:hidden mt-4 mb-4">
          <div className="ment-sect flex flex-col justify-between mr-4 w-full md:w-4/6 bg-white pt-2 pb-2 pl-4 pr-4">
            <div className="flex flex-row items-center justify-between">
              <div>
                <h1 className="pl-8">Mentor Chart</h1>
              </div>
              <div className="ment-sup flex flex-row items-center pl-4">
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.4853 14.5872C14.5789 14.5872 16.1261 14.5872 17.0868 13.6257C18.0483 12.6651 18.0483 11.1178 18.0483 8.02419C18.0483 4.93056 18.0483 3.38333 17.0868 2.42267C16.1261 1.46119 14.5789 1.46119 11.4853 1.46119H8.20375C5.11011 1.46119 3.56289 1.46119 2.60223 2.42267C1.64075 3.38333 1.64075 4.93056 1.64075 8.02419C1.64075 11.1178 1.64075 12.6651 2.60223 13.6257C3.13793 14.1622 3.85576 14.3993 4.92225 14.5035"
                    stroke="white"
                    stroke-width="1.64075"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.4853 14.5872C10.4713 14.5872 9.35394 14.9974 8.33422 15.5265C6.69511 16.3773 5.87555 16.803 5.47193 16.5315C5.0683 16.2608 5.1446 15.4199 5.29801 13.7389L5.33246 13.3566"
                    stroke="white"
                    stroke-width="1.64075"
                    stroke-linecap="round"
                  />
                </svg>
                <span className="text-white pl-1">Support</span>
              </div>
              <div>
                <a href="" className="ment-support"></a>
              </div>
            </div>
            <div className="mx-auto my-auto">
              <div className="ment-msg">
                <svg
                  width="239"
                  height="74"
                  viewBox="0 0 239 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_7_1111)">
                    <rect
                      x="9"
                      y="9"
                      width="221"
                      height="55.685"
                      rx="8.70079"
                      fill="#F4F4F4"
                    />
                  </g>
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <circle
                    cx="36.4075"
                    cy="36.4075"
                    r="15.6614"
                    stroke="#925FE2"
                    stroke-width="2.61024"
                  />
                  <circle
                    cx="36.8425"
                    cy="36.8425"
                    r="4.35039"
                    fill="#925FE2"
                  />
                  <defs>
                    <filter
                      id="filter0_d_7_1111"
                      x="0.125197"
                      y="0.125197"
                      width="238.75"
                      height="73.4346"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="0.174016"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_7_1111"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4.35039" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_7_1111"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_7_1111"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <div className="ment-msg1">
                <svg
                  width="239"
                  height="74"
                  viewBox="0 0 239 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_d_7_1111)">
                    <rect
                      x="9"
                      y="9"
                      width="221"
                      height="55.685"
                      rx="8.70079"
                      fill="#F4F4F4"
                    />
                  </g>
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="64.6851"
                    y="19.4409"
                    width="148.783"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <rect
                    x="63.8149"
                    y="37.7126"
                    width="57.4252"
                    height="13.0512"
                    rx="6.52559"
                    fill="#DADADA"
                  />
                  <circle
                    cx="36.4075"
                    cy="36.4075"
                    r="15.6614"
                    stroke="#925FE2"
                    stroke-width="2.61024"
                  />
                  <circle
                    cx="36.8425"
                    cy="36.8425"
                    r="4.35039"
                    fill="#925FE2"
                  />
                  <defs>
                    <filter
                      id="filter0_d_7_1111"
                      x="0.125197"
                      y="0.125197"
                      width="238.75"
                      height="73.4346"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood
                        flood-opacity="0"
                        result="BackgroundImageFix"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feMorphology
                        radius="0.174016"
                        operator="dilate"
                        in="SourceAlpha"
                        result="effect1_dropShadow_7_1111"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4.35039" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_7_1111"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_7_1111"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
            <div>
              <input
                type="text"
                placeholder="Add a Comment"
                className="ment-input pl-10 w-full border border-gray-300 focus:border-violet-900 focus:outline-none focus:ring focus:ring-violet-100"
              />
            </div>
          </div>
          <div className="invite-sect mt-4 md:mt-0 w-full md:w-2/6 flex flex-col items-center pt-2 pb-2">
            <a href="">
              <img
                src="src\assets\stats\Group 1410097013.png"
                alt=""
              />
            </a>
          </div>
        </section>
        {/* mobile end */}
      </div>

    </div>

  </div>
  )
}

export default Dashbord