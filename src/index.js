import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const colors = [
    '#5454ab',
    '#ad3e3e',
    '#5db0a6',
    '#b3488f',
    '#7a322e',
    '#456b37',
    '#9e319e',
    '#4d184c',
    '#4c4d18',
    '#1c184f'
  ]
  
  class QuoteMachine extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        quoteArr: [],
        author: 'Mark Caine',
        quote: 'The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.',
        color: colors[0]
      }
      this.newQuote = this.newQuote.bind(this);
    }
    
    async componentDidMount() {
      const url = "https://raw.githubusercontent.com/PaulSklv/freecodecamp/master/quotes.json"
      const response = await fetch(url);
      var data = await response.json();
      let index = Math.floor(Math.random() * this.state.quoteArr.length);
      this.setState({quoteArr: data
    });
    }
    newQuote() {
        const index = Math.floor(Math.random() * this.state.quoteArr.length);
        $('blockquote').fadeOut('slow');
        this.setState({
          author: this.state.quoteArr[index].author,
          quote: this.state.quoteArr[index].quote,
          color: colors[index]
        });
        $('blockquote').fadeIn('slow');
    }
    
    render() {
      return (
       <div className="row justify-content-center h-100" style={{background: this.state.color}}>
        <div id="quote-box"  className="my-auto">
          <blockquote style={{color: this.state.color}}>
           <p id="text"><i class="fas fa-quote-left quoteIcon" style={{color: this.state.color}}></i>{this.state.quote}</p>
            <cite id="author">- {this.state.author}</cite>
          </blockquote>
          <div className='buttons'>
            <a id="tweet-quote" href={'https://twitter.com/intent/tweet?text=' + '"' + encodeURIComponent(this.state.quote) + '"' + '%20-%20' + encodeURIComponent(this.state.author)} target='_blank' title="Tweet!" style={{backgroundColor: this.state.color, width: '40px', paddingTop: '5px'}}><i class="fab fa-twitter"></i></a>
            
            <button type='button' id="new-quote" onClick={this.newQuote} style={{backgroundColor: this.state.color}}>New quote</button>
          </div>
        </div>
      </div>
      );
    }
  }
  
  ReactDOM.render(<QuoteMachine />, document.querySelector(".container-fluid"));