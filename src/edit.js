/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";
import {
	TextControl,
	Flex,
	FlexBlock,
	FlexItem,
	Button,
	Icon,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
	const { question, answers } = attributes;

	// Update the question attribute
	const onChangeQuestion = (newQuestion) => {
		setAttributes({ question: newQuestion });
	};

	// Update an answer at a specific index
	const onChangeAnswer = (index, newAnswer) => {
		const newAnswers = [...answers]; // Create a copy of the current answers array
		newAnswers[index] = newAnswer; // Update the specific answer
		setAttributes({ answers: newAnswers }); // Save the updated answers
	};

	// Add a new empty answer to the answers array
	const onAddAnswer = () => {
		const newAnswers = [...answers, ""]; // Add an empty string to the array
		setAttributes({ answers: newAnswers }); // Save the updated answers
	};

	// Remove an answer from the answers array
	const onRemoveAnswer = (index) => {
		const newAnswers = answers.filter((_, i) => i !== index); // Remove the specific answer
		setAttributes({ answers: newAnswers }); // Save the updated answers
	};

	return (
		<div {...useBlockProps()}>
			<TextControl
				label="Question:"
				value={question}
				onChange={onChangeQuestion}
			/>
			<div className="answers-section">
				{answers.map((answer, index) => (
					<div key={index} className="answer-item">
						<TextControl
							label={`Answer ${index + 1}:`}
							value={answer}
							onChange={(newAnswer) => onChangeAnswer(index, newAnswer)}
						/>
						<Button
							isDestructive
							onClick={() => onRemoveAnswer(index)}
							label="Remove Answer"
							className="remove-answer-button"
						>
							Remove
						</Button>
					</div>
				))}
			</div>
			<Button isPrimary onClick={onAddAnswer} className="add-answer-button">
				Add Answer
			</Button>
		</div>
	);
}
