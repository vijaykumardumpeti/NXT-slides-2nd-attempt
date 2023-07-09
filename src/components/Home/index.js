import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'
import Slides from '../Slides'
import Display from '../Display'
import './index.css'

class Home extends Component {
  state = {
    activeTab: '',
    slidesList: [],
  }

  componentDidMount() {
    const initialSlidesList = [
      {
        id: 'cc6e1752-a063-11ec-b909-0242ac120002',
        heading: 'Welcome',
        description: 'Rahul',
      },
      {
        id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
        heading: 'Agenda',
        description: 'Technologies in focus',
      },
      {
        id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
        heading: 'Cyber Security',
        description: 'Ethical Hacking',
      },
      {
        id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
        heading: 'IoT',
        description: 'Wireless Technologies',
      },
      {
        id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
        heading: 'AI-ML',
        description: 'Cutting-Edge Technology',
      },
      {
        id: 'cc6e2224-a063-11ec-b909-0242ac120002',
        heading: 'Blockchain',
        description: 'Emerging Technology',
      },
      {
        id: 'cc6e233c-a063-11ec-b909-0242ac120002',
        heading: 'XR Technologies',
        description: 'AR/VR Technologies',
      },
    ]

    this.setState({
      activeTab: initialSlidesList[0].id,
      slidesList: initialSlidesList,
    })
  }

  slideClick = id => {
    this.setState({activeTab: id})
  }

  updateDescription = newDescription => {
    const {activeTab, slidesList} = this.state
    const updatedSlidesList = slidesList.map(slide =>
      slide.id === activeTab ? {...slide, description: newDescription} : slide,
    )
    this.setState({slidesList: updatedSlidesList})
  }

  updateHeading = newHeading => {
    const {activeTab, slidesList} = this.state
    const updatedSlidesList = slidesList.map(slide =>
      slide.id === activeTab ? {...slide, heading: newHeading} : slide,
    )
    this.setState({slidesList: updatedSlidesList})
  }

  addNewTab = () => {
    const {activeTab, slidesList} = this.state

    const newTab = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
    }

    const activeTabIndex = slidesList.findIndex(tab => tab.id === activeTab)

    const updatedSlidesList = [...slidesList]

    if (activeTabIndex !== -1) {
      updatedSlidesList.splice(activeTabIndex + 1, 0, newTab)
    } else {
      updatedSlidesList.push(newTab)
    }

    this.setState({
      slidesList: updatedSlidesList,
      activeTab: newTab.id,
    })
  }

  render() {
    const {activeTab, slidesList} = this.state
    const filteredSlide = slidesList.find(slide => slide.id === activeTab)

    return (
      <div className="home">
        <Header />
        <button type="button" className="new-btn" onClick={this.addNewTab}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
            className="plus-image-size"
          />
          New
        </button>
        <div className="home-container">
          <div className="sliding-container">
            <ol testid="slide">
              {slidesList.map((slide, index) => (
                <Slides
                  key={slide.id}
                  eachItem={slide}
                  slideClick={this.slideClick}
                  isActive={activeTab === slide.id}
                  slideNumber={index}
                />
              ))}
            </ol>
          </div>
          <div className="display-container">
            <div
              className="sub-display-container"
              testid="slide background image"
            >
              {filteredSlide && (
                <Display
                  slideItem={filteredSlide}
                  key={filteredSlide.id}
                  newUpdateHeading={this.updateHeading}
                  newUpdateDescription={this.updateDescription}
                  activeTabIndex={activeTab}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
