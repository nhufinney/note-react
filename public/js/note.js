var list;
var Note = React.createClass({
	saveNote(){
		var note = this;
		$.post('/update', {idUpdate: this.props.id, contentUpdate: this.refs.update.value}, function(data){
			list.setState({array: data});
			note.setState({onEdit: false});
		});
	},
	cancelNote(){
		this.setState({onEdit: false});
	},
	deleteNote(){
		$.post('/deleteNote', {idDelete: this.props.id}, function(data){
			list.setState({array: data});
		})
	},
	editNote(){
		this.setState({onEdit: true});
	},
	getInitialState(){
		return {onEdit: false}
	},
	render(){
		if (this.state.onEdit) {
			return (
				<div className="div-note">
					<input defaultValue={this.props.children} ref="update"/>
					<button onClick={this.saveNote}>Save</button>
					<button onClick={this.cancelNote}>Cancel</button>
				</div>
			)	
		} else {
			return (
				<div className="div-note">
					<p>{this.props.children}</p>
					<button onClick={this.deleteNote}>Delete</button>
					<button onClick={this.editNote}>Edit</button>
				</div>
			);
		}
	}
});

function addDiv(){
	ReactDOM.render(<InputDiv/>, document.getElementById("div-add"));
}

var List = React.createClass({
	getInitialState(){
		list = this;
		return {array: []}
	},
	render(){
		return(
			<div className="div-list">
				<div id="div-add"></div>
				<button onClick={addDiv}>Add New</button>
				{
					this.state.array.map(function(note, index){
						return <Note key={index} id={index}>{note}</Note>
					})
				}
			</div>
		);
	},
	componentDidMount(){
		var that = this;
		$.get("/getNotes", function(data){
			that.setState({array: data});
		});
	}
});

var InputDiv = React.createClass({
	send(){
		// list.setState({array: list.state.array.concat(this.refs.txt.value)});
		$.post("/add", {note: this.refs.txt.value}, function(data){
			list.setState({array: data});
		});
		ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));
	},
	render(){
		return(
			<div className="input">
				<input type="text" ref="txt" placeholder="Enter new note"/>
				<button onClick={this.send}>Create</button>
			</div>
		)
	}
});

ReactDOM.render(
	<div>
		<List/>
	</div>
	, document.getElementById('root')
);