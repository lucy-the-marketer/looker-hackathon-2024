# looker.plugins.visualizations.add({id:"intricity_heatmap_scatterplot_lucy",label:"Heatmap - Scatterplot Lucy",options:{color_range:{type:"array",label:"Color Range",display:"colors",order:0},x_axis_type:{type:"string",label:"X-Axis Type",display:"select",values:[{"Number of Columns":"cols"},{"Value List":"vals"}],default:"cols",order:1},x_columns:{type:"number",label:"Number of Columns",default:2,order:2},y_axis_type:{type:"string",label:"Y-Axis Type",display:"select",values:[{"Number of Rows":"rows"},{"Value List":"vals"}],default:"rows",order:3},y_rows:{type:"number",label:"Number of Rows",default:2,order:4}},handleErrors:function(e,t,s){return t&&t.fields&&s&&s.color_range?4!=t.fields.dimension_like.length?(this.addError({group:"dimension-req",title:"Incompatible Data",message:"Four dimensions are required"}),!1):(this.clearErrors("dimension-req"),0!=t.fields.pivots.length?(this.addError({group:"pivot-req",title:"Incompatible Data",message:"Zero pivots are required"}),!1):(this.clearErrors("pivot-req"),0!=t.fields.measure_like.length?(this.addError({group:"measure-req",title:"Incompatible Data",message:"Zero measures are required"}),!1):(this.clearErrors("measure-req"),!0))):null},create:function(e,t){this._css=d3.select(e).append("style").html("body { font-family: Open Sans,Helvetica,Arial,sans-serif; font-size: 12px; line-height: 1.53846; color: #3a4245; background-color: #fff; overflow: hidden; }"),cssLink=document.createElement("link"),cssLink.href="https://fonts.googleapis.com/css?family=Open+Sans:300,400",cssLink.rel="stylesheet",cssLink.type="text/css",e.ownerDocument.head.appendChild(cssLink),this.el_id="heatmap_scatterplot_chart",d3.select(e).append("div").attr("id",this.el_id),this.container=d3.select("#"+this.el_id)},update:function(e,t,s,l){if(!this.handleErrors(e,l,s))return;$("#"+this.el_id).empty();const o=l.fields.dimension_like,a=30,i=30,r=30,n=60,d=t.clientWidth-n-i,c=t.clientHeight-a-r;let p=!1;if("vals"!=s.x_axis_type||this.options.x_vals?"cols"==s.x_axis_type&&this.options.x_vals&&(this.options.x_vals=!1,this.options.x_columns={type:"number",label:"Number of Columns",default:2,order:2},p=!0):(this.options.x_vals={type:"string",label:"X-Axis Values",default:"",placeholder:"Comma-delimited list of values",order:2},this.options.x_columns=!1,p=!0),"vals"!=s.y_axis_type||this.options.y_vals?"rows"==s.y_axis_type&&this.options.y_vals&&(this.options.y_vals=!1,this.options.y_rows={type:"number",label:"Number of Rows",default:2,order:4},p=!0):(this.options.y_vals={type:"string",label:"Y-Axis Values",default:"",placeholder:"Comma-delimited list of values",order:4},this.options.y_rows=!1,p=!0),p)return void this.trigger("registerOptions",this.options);const u=d3.select("#"+this.el_id).append("svg").attr("width",d+n+i).attr("height",c+a+r).append("g").attr("transform","translate("+n+","+a+")"),m=[],h=[];for(let t of e)h.includes(t[o[2].name].value)||h.push(t[o[2].name].value),m.includes(t[o[3].name].value)||m.push(t[o[3].name].value);const y=d3.max(h);let f=[];if("cols"!=s.x_axis_type&&s.x_vals.includes(","))f=s.x_vals.split(",");else{s.x_columns<2&&(s.x_columns=2);for(let e=1;e<=s.x_columns;e++)f.push(Math.floor(y/s.x_columns)*e)}let _=[];const v=d3.max(m);if("rows"!=s.y_axis_type&&s.y_vals.includes(","))_=s.y_vals.split(",");else{s.y_rows<2&&(s.y_rows=2);for(let e=1;e<=s.y_rows;e++)_.push(Math.floor(v/s.y_rows)*e)}const x=[];let b=0;for(let t of e){if(!t[o[1].name].value.includes("Closed"))continue;const e=t[o[2].name].value,s=f.filter((t,s)=>0==s&&e<=t||s>0&&e<=t&&e>f[s-1])[0],l=t[o[3].name].value,a=s+"|"+_.filter((e,t)=>0==t&&l<=e||t>0&&l<=e&&l>_[t-1])[0],i=x.filter(e=>a in e);if(i.length>0)i[0][a]+=1;else{const e={};e[a]=1,x.push(e)}b++}const g=[];for(let e of x){const t=Object.keys(e)[0];g.includes(e[t])||g.push(e[t])}let w=d3.scaleBand().range([0,d]).domain(f).padding(0);u.append("g").attr("transform","translate(0,"+c+")").call(d3.axisBottom(w));let k=d3.scaleBand().range([c,0]).domain(_).padding(0);u.append("g").call(d3.axisLeft(k));const L=Math.min(0,d3.min(g)),C=d3.max(g),q=Math.round((L+C)/2),A=d3.scaleLinear().range(s.color_range.slice(0,3)).domain([L,q,C]),E=d3.select("#"+this.el_id).append("div").style("opacity",0).attr("class","tooltip").style("position","absolute").style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px");u.selectAll().data(x,e=>Object.keys(e)[0]).enter().append("rect").attr("x",e=>{const t=Object.keys(e)[0].split("|");return w(t[0])}).attr("y",e=>{const t=Object.keys(e)[0].split("|");return k(t[1])}).attr("width",w.bandwidth()).attr("height",k.bandwidth()).style("fill",e=>{const t=Object.keys(e)[0];return A(e[t])}).on("mouseover",function(e){E.style("opacity",1)}).on("mousemove",function(e){const t=d3.mouse(this),s=Object.keys(e)[0],l=Math.round(e[s]/b*100,2);E.html("The exact value of<br>this cell is: "+l+"%").style("left",t[0]+100+"px").style("top",t[1]+"px")}).on("mouseleave",function(e){E.style("opacity",0)});const O=[];for(let t of e)t[o[1].name].value.includes("Closed")||O.push(t);w=d3.scaleLinear().domain([0,Math.max(y,f[f.length-1])]).range([0,d]),k=d3.scaleLinear().domain([0,Math.max(v,_[_.length-1])]).range([c,0]);const M=d3.select("#"+this.el_id).append("div").style("opacity",0).attr("class","tooltip").style("position","absolute").style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px");u.append("g").selectAll("dot").data(O).enter().append("circle").attr("cx",function(e){return w(e[o[2].name].value)}).attr("cy",function(e){return k(e[o[3].name].value)}).attr("r",3).style("fill","#5ca6bb").on("mouseover",function(e){M.style("opacity",1)}).on("mousemove",function(e){const t=d3.mouse(this);M.html("Name: "+e[o[0].name].value+"<br />Age: "+e[o[2].name].value+"<br />ACV: "+e[o[3].name].value).style("left",t[0]+100+"px").style("top",t[1]+"px")}).on("mouseleave",function(e){M.style("opacity",0)})}});

looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "hello_world_lucy_test",
  label: "Hello World Lucy Test",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"Large": "large"},
        {"Small": "small"}
      ],
      display: "radio",
      default: "large"
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    // Insert the data into the page
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

    // Set the size to the user-selected size
    if (config.font_size == "small") {
      this._textElement.className = "hello-world-text-small";
    } else {
      this._textElement.className = "hello-world-text-large";
    }

    // We are done rendering! Let Looker know.
    done()
  }
});
