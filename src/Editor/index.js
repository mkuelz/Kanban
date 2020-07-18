import React from "react";
import { Editor, RichUtils } from "draft-js";
import './index.css'

export default function EditorContainer({ editorState, setEditorState }) {

	const onChange = editorState => {
		setEditorState(editorState)
	};

	const handleKeyCommand = command => {
		const newState = RichUtils.handleKeyCommand(
			editorState,
			command
		);
		if (newState) {
			onChange(newState);
			return "handled";
		}
		return "not-handled";
	};

	const onUnderlineClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
	};

	const onBoldClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"))
	};

	const onItalicClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
	};

	const onStrikeThroughClick = () => {
		onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"))
	};

	const toggleBlockType = event => {
		let blockType = event.target.dataset.label
		onChange(RichUtils.toggleBlockType(editorState, blockType));
	};

	return (
		<div className="editorContainer">
			<div className="draft-btn" onClick={onUnderlineClick}>U</div>
			<div className="draft-btn" onClick={onBoldClick}><b>B</b></div>
			<div className="draft-btn" onClick={onItalicClick}><em>I</em></div>
			<div className="draft-btn" onClick={onStrikeThroughClick} style={{ 'textDecoration': 'line-through' }} >abc</div>
			<div className="draft-btn" >
				<svg data-label="ordered-list-item" onClick={toggleBlockType} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-list-ol" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
					<path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
				</svg>
			</div>
			<div className="draft-btn" >
				<svg data-label="unordered-list-item" onClick={toggleBlockType} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-list-ul" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
				</svg>
			</div>
			<div class="input-group" style={{ 'min-height': '150px' }}>
				<div style={{ 'width': '100%', 'display': 'flex' }}>
					<div class="input-group-prepend">
						<span class="input-group-text">Description</span>
					</div>
					<Editor
						editorState={editorState}
						handleKeyCommand={handleKeyCommand}
						onChange={onChange}
					/>
				</div>
			</div>
		</div>
	);
}
