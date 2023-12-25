import Button from "../components/Button"
import { FaPlayCircle } from "react-icons/fa";
import imgTeen from "../assets/header-pic.webp"
import amazon from "../assets/amazon-2 (1) 1.webp"
import google from "../assets/google-2015 1.webp"
import grab from "../assets/grab-logo.webp"
import facebook from "../assets/facebook.webp"
import airbnb from "../assets/airbnb 1.webp"
import netflix from "../assets/netflix-3 1.webp"
import calendarIcon from "../assets/Group 80.webp"
import notesIcon from "../assets/Group 79.webp"
import peopleIcon from "../assets/Group 81.webp"
import { Link } from "react-router-dom";
import classIllustration from "../assets/Group 5395.webp"
import featureIllustration from "../assets/Group 5396.webp"
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { BsStack } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import ToolsIllustration from "../assets/Group 122.webp"
import ToolsQuiz from "../assets/Group 92.webp"
import management from "../assets/Group 124.webp"
import discussions from "../assets/Group 106.webp"
import driveIcon from "../assets/Group-5400.webp"
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import testimonialImg from "../assets/Mask-Group.webp"
import imageUseNews from "../assets/Group 40.webp"
import pressRelease from "../assets/Rectangle 33.webp"
import news1 from "../assets/Group 42.webp"
import news2 from "../assets/Group 43.webp"

const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
        {/* Header Section */}
        <div className="w-full grid lg:gap-0 xl:gap-0 md:gap-8 sm:gap-36 gap-36 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1  h-[38rem] bg-main xl:rounded-b-[25%] md:rounded-b-[25%] sm:rounded-b-[5%] rounded-b-[5%] lg:rounded-b-[25%]">
          <div className="flex flex-col justify-center w-9/12 h-full mx-auto ">
            <div className="flex flex-col gap-6 mx-auto">
            <h1 className="max-w-xl text-4xl font-bold text-center text-blue-800 lg:text-left xl:text-left md:text-left sm:text-center">
              <span className="font-bold text-orange-500">Studying</span> Online is now much easier
            </h1>
            <p className="max-w-sm font-normal leading-normal text-center lg:text-left xl:text-left md:text-left sm:text-center">Skilline is an interesting platform that will teach you in more an interactive way</p>
            <div className="flex flex-row items-center gap-4">
              <Button id="join_for_free" label="Join for free" className="py-1 font-semibold text-white bg-orange-500 rounded-full lg:py-3 xl:py-3 md:py-3 sm:py-1 lg:flex xl:flex md:flex sm:text-xs text-[.75rem] px-7 hover:bg-black hover:shadow-lg"/>
              <FaPlayCircle className="text-4xl text-blue-600"/>
              <p className="font-semibold text-slate-500">Watch how it works</p>
            </div>
            </div>
          </div>
          <div  className="relative flex flex-col items-center py-24 lg:items-start xl:items-start md:items-start sm:items-center xl:p-0 lg:p-0 md:p-0 sm:py-24">
              <img src={imgTeen} className="absolute bottom-0 w-10/12"/>
          </div>
        </div>
        {/* End Header Section */}
        
        <div className="flex flex-col w-full gap-6 py-10 lg:py-20 xl:py-20 md:py-20 sm:py-10">
          <h1 className="text-lg font-semibold text-center lg:text-2xl xl:text-2xl md:text-2xl sm:text-lg text-slate-400">Trusted by 5,000+ Companies Worldwide</h1>
          <div className="grid w-9/12 grid-cols-3 mx-auto lg:grid-cols-6 xl:grid-cols-6 md:grid-cols-6 sm:grid-cols-3">
            {[amazon, google, grab, facebook, airbnb, netflix]
            .map((data) => {
              return (
                <img src={data} className="w-full p-2 llg:w-9/12 xl:w-9/12 md:w-9/12 sm:w-full"/>
              )
            })
            }
          </div>
        </div>
        <div className="flex flex-col">
            <span className="flex flex-row gap-1 py-8 mx-auto text-xl font-bold"><h1 className="text-blue-900">All-In-One</h1><h1 className="text-orange-500"> Cloud Software.</h1></span>
            <p className="w-10/12 max-w-xl mx-auto font-normal leading-normal text-center lg:w-full xl:w-full md:w-full sm:w-10/12 text-slate-400">Skilline is one powerful online software suite that combines all the tools needed to run a successful school or office.
</p>
            <div className="grid w-10/12 grid-cols-1 gap-16 py-16 mx-auto lg:gap-8 xl:gap-8 md:gap-8 sm:gap-16 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
                <div className="flex flex-col items-center p-8 text-center bg-white shadow-xl">
                  <img src={notesIcon} className="w-4/12 -mt-16"/>
                  <h1 className="py-5 text-xl font-semibold text-blue-700">Online Billing, Invoicing, & Contracts</h1>
                  <p className="font-normal text-md text-slate-400">Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts</p>
                </div>

                <div className="flex flex-col items-center p-8 text-center bg-white shadow-xl">
                  <img src={calendarIcon} className="w-4/12 -mt-16"/>
                  <h1 className="py-5 text-xl font-semibold text-blue-700">Easy Scheduling & Attendance Tracking</h1>
                  <p className="font-normal text-md text-slate-400">Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance</p>
                </div>

                <div className="flex flex-col items-center p-8 text-center bg-white shadow-xl">
                   <img src={peopleIcon} className="w-4/12 -mt-16"/>
                  <h1 className="py-5 text-xl font-semibold text-blue-700">Customer Tracking</h1>
                  <p className="font-normal text-md text-slate-400">Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization </p>
                </div>
                
            </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
            <span className="flex flex-row gap-1 py-4">
              <h1 className="text-2xl font-semibold text-blue-800">What is</h1>
              <h1 className="text-2xl font-semibold text-orange-600">Skilline?</h1>
            </span>
            <p className="w-10/12 max-w-2xl leading-normal text-center lg:w-full xl:w-full md:w-full sm:w-10/12 text-slate-500">
            Skilline is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
            </p>
            <div className="grid w-11/12 grid-cols-1 gap-12 py-16 mx-auto md:w-9/12 sm:w-9/12 lg:w-7/12 xl:w-7/12 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
              <div className="w-full h-[15rem] bg-no-repeat bg-cover border-none shadow-lg bg-instructor rounded-xl">
                <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                  <h1 className="text-xl font-semibold text-white">FOR INSTRUCTOR</h1>
                  <button className="py-3 text-white border-2 border-white rounded-full px-7">Start a class today</button>
                </div>
              </div>
              <div className="w-full h-[15rem] bg-no-repeat bg-cover border-none shadow-lg bg-mentee rounded-xl">
              <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                  <h1 className="text-xl font-semibold text-white">FOR STUDENT</h1>
                  <button className="py-3 text-white bg-blue-400 rounded-full px-7">Enter access code</button>
                </div>
              </div>
            </div>
        </div>
        <div className="grid w-10/12 grid-cols-1 gap-10 py-4 mx-auto lg:py-16 xl:py-16 md:py-16 sm:py-4 lg:gap-0 xl:gap-0 md:gap-0 sm:gap-10 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col justify-center gap-6 mx-auto">
              <h1 className="max-w-md text-2xl font-semibold text-blue-700">Everything you can do in a physical classroom, <span className="text-orange-500">you can do with Skilline</span></h1>
              <p className="max-w-md leading-normal">Skilline’s school management software helps traditional and online schools manage scheduling, attendance, payments and virtual classrooms all in one secure cloud-based system.</p>
              <Link to="#" className="underline">Learn More</Link>
            </div>
            <div>
             <img src={classIllustration}/>
            </div>
        </div>
        <div className="flex flex-col w-full">
            <span className="flex flex-row justify-center gap-1 py-4 text-4xl font-bold text-center lg:py-6 xl:py-6 md:py-6 sm:py-4">
              <h1 className="text-blue-700">Our</h1>
              <h1 className="text-orange-500">Features</h1>
            </span>
            <p className="w-10/12 py-4 mx-auto text-xl font-normal text-center lg:w-full xl:w-full md:w-full sm:w-10/12 text-slate-500">This very extraordinary feature, can make learning activities more efficient</p>
            <div className="grid w-10/12 grid-cols-1 py-16 mx-auto lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="p-0 -mt-10 xl:mt-0 lg:mt-0 md:mt-0 sm:-mt-10 lg:p-6 xl:p-6 md:p-6 s sm:p-2">
                  <img src={featureIllustration}/>
                </div>
                <div className="p-6 ">
                  <span className="flex flex-row">
                    <h1 className="max-w-md py-6 text-xl font-semibold leading-normal text-blue-700 lg:text-4xl xl:text-4xl md:text-4xl sm:text-xl lg:py-0 xl:py-0 md:py-0 sm:py-6">A user interface designed for the classroom</h1>
                   </span>
                  <div className="flex flex-col gap-4 py-2 lg:py-6 xl:py-6 md:py-6 sm:py-2">
                    <div className="flex flex-col gap-6 p-4 lg:items-center xl:items-center md:text-center sm:text-start text-start lg:flex-row xl:flex-row md:flex-row sm:flex-col">
                      <HiMiniRectangleGroup className="text-5xl text-blue-700 lg:text-4xl xl:text-4xl md:text-4xl sm:text-5xl"/>
                      <p className="text-start">Teachers don’t get lost in the grid view and have a dedicated Podium space.</p>
                    </div>
                    <div className="flex flex-col gap-6 p-4 lg:items-center xl:items-center md:text-center sm:text-start text-start lg:flex-row xl:flex-row md:flex-row sm:flex-col">
                      <BsStack  className="text-5xl text-orange-500 lg:text-4xl xl:text-4xl md:text-4xl sm:text-5xl"/>
                      <p className="text-start">TA’s and presenters can be moved to the front of the class.</p>
                    </div>
                    <div className="flex flex-col gap-6 p-4 lg:items-center xl:items-center md:text-center sm:text-start text-start lg:flex-row xl:flex-row md:flex-row sm:flex-col">
                      <FaPeopleGroup  className="text-5xl text-blue-700 lg:text-4xl xl:text-4xl md:text-4xl sm:text-5xl"/>
                      <p className="text-start">Teachers can easily see all students and class data at one time.</p>
                    </div>
                  </div>
                </div>  
            </div>
        </div>
        <div className="grid grid-cols-1 pb-20 -mt-16 lg:mt-0 xl:mt-0 md:mt-0 sm:-mt-16 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col justify-center w-8/12 mx-auto">
              <h1 className="max-w-sm py-6 text-4xl font-bold leading-normal text-blue-700"><span className="text-orange-500">Tools</span> For Teachers And Learners</h1>
              <p className="max-w-sm leading-normal text-slate-500">Class has a dynamic set of teaching tools built to be deployed and used during class.
Teachers can handout assignments in real-time for students to complete and submit.</p>
            </div>
            <div className="flex justify-center py-16 lg:justify-start xl:justify-start md:justify-start sm:justify-center lg:py-0 xl:py-0 md:py-0 sm:py-16">
              <img src={ToolsIllustration} className="w-9/12"/>
            </div>
        </div>
        <div className="grid grid-cols-1 py-16 -mt-28 xl:mt-0 lg:mt-0 md:mt-0 sm:-mt-28 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="w-full mx-auto">
              <img src={ToolsQuiz} className="w-8/12 mx-auto"/>
        </div>
            <div className="flex flex-col items-start justify-center w-full px-10 lg:w-8/12 xl:w-8/12 md:w-8/12 sm:w-full">
              <h1 className="max-w-sm py-6 text-4xl font-bold leading-normal text-center text-blue-700 md:text-left xl:text-left lg:text-left sm:text-center">Assessments, <span className="text-orange-500">Quizzes</span>, Tests</h1>
              <p className="max-w-sm leading-normal text-center lg:text-left xl:text-left md:text-left sm:text-center text-slate-500">Easily launch live assignments, quizzes, and tests.
Student results are automatically entered in the online gradebook.</p>
            </div>
            
        </div>
        <div className="grid grid-cols-1 pb-20 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col justify-center w-8/12 mx-auto">
              <h1 className="max-w-sm py-6 text-4xl font-bold leading-normal text-center text-blue-700 lg:text-left xl:text-left md:text-left sm:text-center"><span className="text-orange-500">Class Management</span> Tools for Educators</h1>
              <p className="max-w-sm leading-normal text-center sm:text-center md:text-left lg:text-left xl:text-left text-slate-500">Class provides tools to help run and manage the class such as Class Roster, Attendance, and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
</p>
            </div>
            <div className="">
              <img src={management} className="w-9/12 mx-auto"/>
            </div>
        </div>
        <div className="grid grid-cols-1 py-0 lg:py-16 xl:py-16 md:py-16 sm:py-0 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="w-full mx-auto">
              <img src={discussions} className="w-8/12 mx-auto"/>
        </div>
            <div className="flex flex-col items-start justify-center w-8/12 px-10">
              <h1 className="max-w-sm py-6 text-4xl font-bold leading-normal text-center text-blue-700 lg:text-left xl:text-left md:text-left sm:text-center">One-on-One <span className="text-orange-500">Discussions</span></h1>
              <p className="max-w-sm leading-normal text-slate-500">Teachers and teacher assistants can talk with students privately without leaving the Zoom environment.</p>
            </div>
            
        </div>
        <div className="flex justify-center w-full py-8 mx-auto">
          <Button label="See more features" id="btn-features" className="py-3 font-semibold text-orange-500 border-2 border-orange-400 rounded-full px-9"/>
        </div>
        <div className="grid grid-cols-1 py-16 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <div className="w-full mx-auto">
              <img src={driveIcon} className="w-8/12 mx-auto"/>
        </div>
            <div className="flex flex-col items-start justify-center w-8/12 px-10">
              <span className="flex flex-row items-center gap-4">
                <h1 className="pb-3 font-bold text-slate-500">_________</h1>
                <p className="tracking-widest text-slate-500">INTEGRATION</p>
              </span>
              <h1 className="max-w-sm py-6 text-4xl font-bold leading-normal text-blue-700">200+ educational tools and platform <span className="text-orange-500">integrations</span></h1>
              <p className="max-w-sm leading-normal text-slate-500">Schoology has every tool your classroom needs and comes pre-integrated with more than 200+ tools, student information systems (SIS), and education platforms.</p>
              <div className="py-6">
              <Button label="See All Integration" id="integration" className="py-3 text-orange-500 border-2 border-orange-500 rounded-full px-9"/>
              </div>
            </div>
            
        </div>
        <div className="grid grid-cols-1 py-10 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
            <div className="flex flex-col justify-center w-8/12 mx-auto">
            <span className="flex flex-row items-center gap-4">
                <h1 className="pb-3 font-bold text-slate-500">_________</h1>
                <p className="tracking-widest text-slate-500">TESTIMONIAL</p>
              </span>
              <h1 className="max-w-sm py-6 text-4xl font-bold leading-normal text-blue-700">What They Say?</h1>
              <span className="flex flex-col gap-4">
                <p className="max-w-sm leading-normal text-slate-500">Skilline has got more than 100k positive ratings from our users around the world.</p> 
                <p className="max-w-sm leading-normal text-slate-500">Some of the students and teachers were greatly helped by the Skilline.</p>
                <p className="max-w-sm leading-normal text-slate-500">Are you too? Please give your assessment</p>
              </span>
              <div className="py-6">
              <button className="flex flex-row items-center justify-between w-7/12 gap-3 border-2 border-orange-400 rounded-full">
                <p className="pl-4 mx-auto font-semibold text-center text-orange-400">Write your assesment</p>
                <span>
                  <IoArrowForwardCircleOutline  className="text-5xl text-orange-400"/>
                </span>
              </button>
              </div>
            </div>
            <div className="relative flex flex-col h-[35rem] p-10">
              <div className="relative flex flex-row">
                <img src={testimonialImg} className="w-7/12"/>
                <span className="flex items-center -ml-6 text-5xl">
                  <IoArrowForwardCircleOutline />
                </span>
              </div>
                <div className="shadow-xl w-8/12 flex h-[14rem] rounded-xl border-l-8 absolute bottom-0 left-20  border-red-500 bg-white flex-col justify-center">
                  <p className="max-w-sm px-4 mx-auto border-l-2 border-slate-400 text-slate-500">"Thank you so much for your help. It's exactly what I've been looking for. You won't regret it. It really saves me time and effort. Skilline is exactly what our business has been lacking."</p>
                  <div className="flex flex-row items-center justify-between w-full p-4">
                    <p className="px-4 font-semibold text-slate-400">Gloria Rose</p>
                    <span className="px-4">
                      <p>Star rating</p>
                      <p className="text-sm text-slate-400">12 reviews at Yelp</p>
                    </span>
                  </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col py-24">
          <h1 className="text-2xl font-semibold text-center text-blue-700">Latest News and Resources</h1>
          <h2 className="py-4 text-center text-slate-400">See the developments that have occurred to Skillines in the world</h2>
            <div className="grid w-10/12 grid-cols-1 py-8 mx-auto lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <div className="flex flex-col w-10/12 mx-auto">
                  <img src={imageUseNews} className="w-full"/>
                  <span className="w-3/12 py-4">
                    <p className="p-2 font-semibold text-center text-black bg-orange-300 rounded-xl ">News</p>
                  </span>
                  <h1 className="max-w-sm font-semibold tracking-normal">Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution</h1>
                  <p className="max-w-sm py-6 font-normal leading-normal text-slate-400">Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                  <Link className="underline text-slate-400">Read More</Link>
                </div>
                <div className="grid grid-rows-3 gap-4">
                  <div className="flex flex-row w-full gap-4">
                      <div className="w-4/12 ">
                        <img src={pressRelease} />
                      </div>
                      <div className="flex flex-col w-6/12 gap-2">
                          <h1 className="font-semibold text-blue-700 ">Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand</h1>
                          <p className="leading-normal text-slate-400">Class Technologies Inc., the company that created Class,...</p>
                      </div>
                  </div>
                  <div className="flex flex-row w-full gap-4">
                      <div className="w-4/12">
                        <img src={news1} />
                      </div>
                      <div className="flex flex-col w-6/12 gap-2">
                          <h1 className="font-semibold text-blue-700 ">Zoom’s earliest investors are betting millions on a better Zoom for schools</h1>
                          <p className="leading-normal text-slate-400">Zoom was never created to be a consumer product. Nonetheless, the...</p>
                      </div>
                  </div>
                  <div className="flex flex-row w-full gap-4">
                      <div className="w-4/12 ">
                        <img src={news2} />
                      </div>
                      <div className="flex flex-col w-6/12 gap-2">
                          <h1 className="font-semibold text-blue-700 ">Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom Classrooms</h1>
                          <p className="leading-normal text-slate-400">This year, investors have reaped big financial returns from betting on Zoom...</p>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage