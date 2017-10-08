function getName(name){
    alert(name);
}

var Firstcom = React.createClass({
    getInitialState (){
        return {total: parseInt(this.props.total)};
    },
    addTotal(){
        this.state.total = this.state.total + 1;
        this.setState(this.state);
    },
    getInfo: function() {
            alert(this.props.children);
    },
    render: function(){
        return(
            <div>
                <h1 className="yellow">{this.props.name} -***- {this.props.role}</h1>
                <p className="yellow">{this.props.children} </p>
                <h3>Total students: {this.state.total}</h3>
                <button onClick={()=>{var str = this.props.name + ' - '+ this.props.role; getName(str)}}>Information</button>
                <button onClick={this.addTotal}>Add Student</button>

            </div>
        );
    }
});

var InputTag = React.createClass({
    show(){
        var text = this.refs.num.value;
        alert(text);
    },
    render: function() {
        return(
            <div>
                <select ref="num">
                    <option value="1"> One</option>
                    <option value="2"> Two</option>
                    <option value="3"> Three</option>
                    <option value="4"> Four</option>
                </select>
                <input type="text" ref="txt"/>
                <button onClick={this.show}>Show</button>
            </div>
        );
    }
});

ReactDOM.render(
    <div>
        <InputTag />
        <Firstcom name="ReactJs" role="main" total="10">Learning Subject: React JS</Firstcom>
        <hr/>    
        <Firstcom name="Node JS" role="basic" total="20"/>
    </div>     
    , document.getElementById("root")
);