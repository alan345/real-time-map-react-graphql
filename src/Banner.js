import React, {Component} from 'react'
import './Banner.css'

export default class Banner extends Component {

  render() {
    return (
      <div className='Banner'>

        <div className='InfoText'>Gooplus</div>
        <div
          className='ReadTutorialButton'
          onClick={() => this._openTutorial()}
        >See Our Website</div>
      </div>
    )
  }

  _openTutorial = () => {
    const win = window.open('https://gooplus.fr', '_blank');
    win.focus();
  }

}
