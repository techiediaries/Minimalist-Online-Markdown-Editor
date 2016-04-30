import React from 'react';
import { PanelTypes } from '../constants/AppConstants';
import TopBar from '../components/TopBar.jsx';
import TopPanel from '../components/TopPanel.jsx';
import MarkdownSource from '../components/MarkdownSource.jsx';
import MarkdownPreview from '../components/MarkdownPreview.jsx';
import HtmlSource from '../components/HtmlSource.jsx';

import styles from '../components/css/Panel.css';

class Panel extends React.Component {
  static propTypes = {
    type: React.PropTypes.string.isRequired,
    markdown: React.PropTypes.string.isRequired,
    html: React.PropTypes.string.isRequired,
    caretPos: React.PropTypes.array.isRequired,
    appState: React.PropTypes.object.isRequired,
    files: React.PropTypes.array.isRequired,
    activeFile: React.PropTypes.object.isRequired
  };

  render() {
    var { visibleTopPanel } = this.props.appState;
    var shouldDisplayTopPanel =
      visibleTopPanel !== null && this.props.type === PanelTypes.MARKDOWN_SOURCE;
    var panelContents;

    switch (this.props.type) {
      case PanelTypes.MARKDOWN_SOURCE:
        panelContents =
          <MarkdownSource markdown={this.props.markdown} caretPos={this.props.caretPos}/>;
        break;

      case PanelTypes.MARKDOWN_PREVIEW:
        panelContents = <MarkdownPreview html={this.props.html} />;
        break;

      case PanelTypes.HTML_SOURCE:
        panelContents = <HtmlSource html={this.props.html} />;
        break;
    }

    return (
      <div className={styles.panel}>
        { shouldDisplayTopPanel ?
          <TopPanel type={visibleTopPanel}/> : '' }

        <TopBar className={styles.topBar} {...this.props}/>

        {panelContents}
      </div>
    );
  }
}

export default Panel;
