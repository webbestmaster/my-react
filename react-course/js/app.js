var my_news = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
    }
];

var Article = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function() {
        return {
            visible: false
        };
    },
    readmoreClick: function (e) {

        e.preventDefault();
        this.setState({visible: true});

    },
    render: function() {

        var author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible;

        return (
            <div className='article'>
                <p className='news__author'>{author}:</p>
                <p className='news__text'>{text}</p>
                <a href="#" onClick={this.readmoreClick} className='news__readmore'>Подробнее</a>
                {visible && <p className='news__big-text'>{bigText}</p>}
            </div>
        )

    }

});

var News = React.createClass({
    render: function() {
        var data = this.props.data;
        var newsTemplate;

        if (data.length > 0) {
            newsTemplate = data.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            })
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className='news'>
                {newsTemplate}
                <strong className={'news__count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

// controlled
var сTestInput = React.createClass({
    getInitialState: function () {
        return {
            value: 'Enter input'
        }
    },
    onChangeHandler: function(e) {
        this.setState({value: e.target.value})
    },
    showInputValue: function () {
        var value = this.state.value;
        alert(value);
    },
    render: function() {
        return (
            <div>
                <input className='test-input' onChange={this.onChangeHandler} value={this.state.value} />
                <input value='click me' onClick={this.showInputValue} type='button' />
            </div>
        );
    }
});

// UNcontrolled
var TestInput = React.createClass({
    componentDidMount: function() { //ставим фокус в input
        ReactDOM.findDOMNode(this.refs.myTestInput).focus();
    },
    showInputValue: function () {
        var value = ReactDOM.findDOMNode(this.refs.myTestInput).value;
        alert(value);
    },
    render: function() {
        return (
            <div>
                <input className='test-input' ref='myTestInput' onChange={this.onChangeHandler} defaultValue='' />
                <input value='click me' onClick={this.showInputValue} type='button' />
            </div>
        );
    }
});

var Add = React.createClass({
    getInitialState: function () {
        return {
            checkRule: false
        }
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onCheckRuleChange: function (e) {

        var isChecked = e.target.checked;

        this.setState({
            checkRule: isChecked
        });

    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
    },
    render: function() {
        return (
            <form className='add cf'>
                <input
                    type='text'
                    className='add__author'
                    defaultValue=''
                    placeholder='Ваше имя'
                    ref='author'
                />
                <textarea
                    className='add__text'
                    defaultValue=''
                    placeholder='Текст новости'
                    ref='text'
                ></textarea>
                <label className='add__checkrule'>
                    <input type='checkbox' onChange={this.onCheckRuleChange} checked={this.state.checkRule} ref='checkrule' />Я согласен с
                    правилами
                </label>
                {this.state.checkRule &&
                <button
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    ref='alert_button'>
                    Показать alert
                </button>
                }
            </form>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className='app'>
                <h3>Новости</h3>
                <TestInput />
                <Add />
                <News data={my_news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);