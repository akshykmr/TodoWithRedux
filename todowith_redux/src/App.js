import React from 'react'
import Input from './component/Input'
import './App.css'
const App = () => {
  return (
    <section className="vh-100 ">
  <div className="container py-4 h-100">
    <div className="row d-flex justify-content-center  h-90">
      <div className="col-md-12 col-xl-10">
        <div className="card mask-custom">
          <div className="card-body p-md-4 text-white">
            <div className="text-center ">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                alt="Check" width="60"/>
              <h2 className="my-4">ToDo List With Redux</h2>
            </div>
            <div className="inputsection">
              <Input/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  )
}

export default App
