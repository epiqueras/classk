/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-es6-class */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactQuill from 'react-quill';

export default class TextDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
    this._quillModules = {
      formula: true,
      syntax: true,
      toolbar: false,
    };
    this._quillFormats = [
      'header', 'font', 'color', 'background',
      'script', 'sub', 'super', 'align',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet',
      'formula', 'code-block',
      'link',
    ];
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
  }

  componentDidUpdate() {
    this.refs.quillRef.getEditor().setContents(JSON.parse(this.props.contentJson));
  }

  render() {
    return (
      <div>
        <div className="_quill">
          <ReactQuill
            ref="quillRef"
            theme="snow"
            modules={this._quillModules}
            formats={this._quillFormats}
            toolbar={false}
            bounds={'._quill'}
            readOnly
          >
            <div
              key="editor"
              ref="editor"
              className="quill-contents border_solid_top"
            />
          </ReactQuill>
        </div>
      </div>
    );
  }
}

TextDisplay.propTypes = {
  contentJson: React.PropTypes.string,
};
