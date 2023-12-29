
import Button from '../components/Button'


const Career = () => {

  const topJobs = [
    {
      "id" : 1,
      "role" : "Front-End Developer",
      "icon" : "",
      "company" : "Figma",
      "Description" : "We are looking for an experienced front-end developer to join our team.",
      "tech_stack" : "Rust",
      "salary" : "$70,000 - $90,000"
    },
    {
      "id" : 2,
      "role" : "Data Scientist",
      "icon": "",
      "company" : "Facebook",
      "Description" : "We are seeking a data scientist to join our team.",
      "tech_stack" : "Python",
      "salary" : "$100,000 - $130,000"
    },
    {
      "id" : 3, 
      "role" : "Technical Writer",
      "icon" : "",
      "company" : "Vercel",
      "Description" : "We are seeking a technical writer to join our team.",
      "tech_stack" : "Documentation",
      "salary" : "$60,000 - $80,000"
    }
  ]

  return (
    <div className='w-full min-h-screen bg-main'>
      <div className='flex flex-col'>
        <h1>Get Connected and Thrive With Skillup</h1>
        <h2>Discover a wide range of remote opportunities on our platform and take control of your career</h2>
        <div className='flex flex-row'>
          <Button label='Explore Jobs' id='btn-explore'/>
         </div>
      </div>
      <h1>Features Job</h1>
      <div className='grid w-11/12 grid-cols-1 gap-4 mx-auto xl:w-10/12 lg:w-10/12 md:w-10/12 sm:w-11/12 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1'>
       {topJobs.map(data => {
        return (
          <div key={data.id} className='flex flex-col bg-white rounded-lg shadow-lg '>
            <div className='flex-1'>
            <div className='flex flex-row'>
              <div className=''>
                {data.icon}
              </div>
              <div className='flex flex-col'>
                <h1>{data.role}</h1>
                <h2>{data.company}</h2>
              </div>
            </div>
            </div>
            <div className='flex-1'>
              <p>{data.Description}</p>
            </div>
            <div className='flex flex-row flex-1'>
              <p>{data.tech_stack}</p>
              <p>{data.salary}</p>
            </div>
          </div>
        )
       })}
      </div>
    </div>
  )
}

export default Career