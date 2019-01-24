import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';
import { AttributeFilter, ColumnChart } from '@gooddata/react-components';
import './settings.js';

const measures = [{
                     "measure" : {
                        "definition" : {
                           "measureDefinition" : {
                              "aggregation" : "sum",
                              "item" : {
                                 "uri" : "/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/1144"
                              }
                           }
                        },
                        "format" : "#,##0.00",
                        "localIdentifier" : "1b502b639a0242fab65e50645ddde78d",
                        "alias" : "Sum of Amount"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "measureDefinition" : {
                              "aggregation" : "count",
                              "item" : {
                                 "uri" : "/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/949"
                              }
                           }
                        },
                        "format" : "#,##0",
                        "localIdentifier" : "32a1cdaf24b54aaa81218ad075ce7028",
                        "alias" : "Count of Product"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "popMeasureDefinition" : {
                              "measureIdentifier" : "CloseBOP",
                              "popAttribute" : {
                                 "uri" : "/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/513"
                              }
                           }
                        },
                        "localIdentifier" : "CloseBOP_pop",
						"alias": "SPY Close BOP"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "measureDefinition" : {
                              "item" : {
                                 "uri" : "/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/9211"
                              }
                           }
                        },
                        "localIdentifier" : "CloseBOP",
                        "title" : "_Close [BOP]"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "arithmeticMeasure" : {
                              "measureIdentifiers" : [
                                 "CloseBOP_pop",
                                 "CloseBOP"
                              ],
                              "operator" : "sum"
                           }
                        },
                        "localIdentifier" : "sumDM",
						"alias": "Sum derived measure",
						"format" : "#,##0.00%"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "arithmeticMeasure" : {
                              "measureIdentifiers" : [
                                 "CloseBOP_pop",
                                 "CloseBOP"
                              ],
                              "operator" : "ratio"
                           }
                        },
                        "localIdentifier" : "ratioDM",
						"alias": "Ratio devired measure",
						"format" : "#,##0.00%"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "arithmeticMeasure" : {
                              "measureIdentifiers" : [
                                 "CloseBOP_pop",
                                 "CloseBOP"
                              ],
                              "operator" : "difference"
                           }
                        },
                        "localIdentifier" : "differentDM",
						"alias": "Different devired measure",
						"format" : "#,##0.00%"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "arithmeticMeasure" : {
                              "measureIdentifiers" : [
                                 "CloseBOP_pop",
                                 "CloseBOP"
                              ],
                              "operator" : "multiplication"
                           }
                        },
                        "localIdentifier" : "multiplicationDM",
						"alias": "Multiplication devired measure",
						"format" : "#,##0.00%"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "arithmeticMeasure" : {
                              "measureIdentifiers" : [
                                 "CloseBOP_pop",
                                 "CloseBOP"
                              ],
                              "operator" : "change"
                           }
                        },
                        "localIdentifier" : "changeDM",
						"alias": "Change devired measure",
						"format" : "#,##0.00"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "arithmeticMeasure" : {
                              "measureIdentifiers" : [
                                 "changeDM",
                                 "CloseBOP"
                              ],
                              "operator" : "sum"
                           }
                        },
                        "localIdentifier" : "sumDMAM",
						"alias": "Sum devired AM",
						"format" : "#,##0.00"
                     }
                  },
                  {
                     "measure" : {
                        "definition" : {
                           "popMeasureDefinition" : {
                              "measureIdentifier" : "sumDMAM",
                              "popAttribute" : {
                                 "uri" : "/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/513"
                              }
                           }
                        },
                        "localIdentifier" : "sumDMAM_pop",
						"alias": "SPY sumDMAM"
                     }
                  }];


class App extends Component {
	constructor(props) {
        super(props);
        this.state = {
            filters: []
        };
    }

	 onApply = (filter) => {
        console.log('AttributeFilterExample filter', filter);

        const isPositive = !!filter.in;
        const elementsProp = isPositive ? 'in' : 'notIn';
		var attrUri = '';

		//control handle filter with more attributes, but only apply one attribute at the time
		if (filter.id === global.YearSnapLabelId){
			attrUri = global.YearSnapUri
		}else{
			attrUri = global.YearSnapUri
		}
		//end control handle filter with more attributes
		
		
        const filters = [{
            [isPositive ? 'positiveAttributeFilter' : 'negativeAttributeFilter']: {
                displayForm: {
                    identifier: filter.id //if define attribute filter with identifier then id will return identifier
                },
				//uri của attribute không phải của label
                [elementsProp]: filter[elementsProp].map(element => (`${attrUri}/elements?id=${element}`)) 
            }
        }];
		const comparison1 = {
               "relativeDateFilter" : {
                  "dataSet" : {
                     "uri" : "/gdc/md/oa41nnalv7fgay0vxxk2lgilctgzjnoa/obj/520"
                  },
                  "from" : -3,
                  "granularity" : "GDC.time.quarter",
                  "to" : 0
               }
            }
		filters.push(comparison1);

        this.setState({ filters });
    }
  render() {
	  const { filters } = this.state;
    return (
<div>
        <p>Create Column chart</p>
		
		<div className="App" style={{width: 1500, height: 600, paddingLeft: 50}}>
		
		<p> Attribute Filter</p>
                  <AttributeFilter
                      identifier={global.YearSnapLabelId}
                      projectId={global.projectId}
                      fullscreenOnMobile={false}
					  onApply={this.onApply}
                  />
		<ColumnChart 
			projectId={global.projectId}
			measures={measures}
			filters = {filters}
			/*drillableItems={[
				  {  
				  //drill with specifix attribute show all values of measure belong attribute
					//uri : global.Attr01Uri + `/elements?id=169664`
					uri : global.Attr02Uri + `/elements?id=169664`
					
					//drill with attribute show all values of measure belong attribute
					//identifier : global.Attr02LabelInden
					//identifier : global.Attr01LabelInden
					
					//drill with ad-hoc meaasure with attribute
					//identifier : global.Attr02Inden
					//uri : global.Attr02Uri
					
					//drill with ad-hoc meaasure with fact
					//identifier : global.Fact01Inden
					//uri : global.Fact01Uri
					
					//drill with ad-hoc meaasure with attribute
					//identifier : global.Metric01Inden
					//uri : global.Metric01Uri
				  }
			  ]}*/
		/>
		</div>
</div>
    );
  }
}

export default App;
