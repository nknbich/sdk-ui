import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';
import { Visualization } from '@gooddata/react-components';

class App extends Component {
  render() {
    return (
<div className="App" style={{width: 1000, height: 600, paddingLeft: 50}}>
        <p>Embed AD with uri or indentifier</p>
		
		<Visualization
			projectId="oa41nnalv7fgay0vxxk2lgilctgzjnoa"
			uri="/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/76324"
			
		/>
</div>
    );
  }
}

export default App;
