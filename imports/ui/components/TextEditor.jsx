/* global document */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-es6-class */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactQuill from 'react-quill';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorContent: '', initialMount: false };
    this.onTextChange = this.onTextChange.bind(this);
    this.focusEditor = this.focusEditor.bind(this);
    this._quillModules = {
      formula: true,
      syntax: true,
      toolbar: [
        [{ header: [1, 2, false] }, { font: [] }, { color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }, { align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['formula', 'code-block'],
        ['clean'],
      ],
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
    this.setState({ initialMount: true });
  }

  componentDidUpdate() {
    if (this.props.contentJson && this.state.initialMount) {
      this.refs.quillRef.getEditor().setContents(JSON.parse(this.props.contentJson));
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ initialMount: false });
    }
  }

  onTextChange(value) {
    const jsonString = JSON.stringify(this.refs.quillRef.getEditor().getContents());
    const textLength = this.refs.quillRef.getEditor().getLength();
    this.props.getContentJson(jsonString, textLength);
    this.setState({ editorContent: value });
  }

  focusEditor() {
    if (document.getElementsByClassName('ql-tooltip')[0].classList.value.includes('ql-hidden')) {
      this.refs.quillRef.getEditor().focus();
    }
  }

  render() {
    return (
      <div onClick={this.focusEditor}>
        <div className="_quill">
          <ReactQuill
            ref="quillRef"
            theme="snow"
            modules={this._quillModules}
            formats={this._quillFormats}
            toolbar={false}
            bounds={'._quill'}
            onChange={this.onTextChange}
          >
            <div
              key="editor"
              ref="editor"
              className="quill-contents border_solid_top"
              dangerouslySetInnerHTML={{ __html: this.state.editorContent }}
            />
          </ReactQuill>
        </div>
      </div>
    );
  }
}

TextEditor.propTypes = {
  getContentJson: React.PropTypes.func,
  contentJson: React.PropTypes.string,
};
