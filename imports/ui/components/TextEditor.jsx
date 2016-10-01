/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prefer-es6-class */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactQuill from 'react-quill';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorContent: '' };
    this.onTextChange = this.onTextChange.bind(this);
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

  onTextChange(value) {
    const jsonString = JSON.stringify(this.refs.quillRef.getEditor().getContents());
    this.props.getContentJson(jsonString);
    this.setState({ editorContent: value });
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
};
