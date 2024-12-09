<?php
// Access the block's attributes
$attributes = isset( $block->attributes ) ? $block->attributes : array();

// Check if the 'question' attribute is set and not empty
if ( isset( $attributes['question'] ) && ! empty( $attributes['question'] ) ) {
    echo '<p ' . get_block_wrapper_attributes() . '>';
    // Display the 'question' attribute
    echo esc_html( $attributes['question'] );
    echo '</p>';
} else {
    // Fallback message if 'question' is not set or is empty
    echo '<p ' . get_block_wrapper_attributes() . '>';
    esc_html_e( 'Please enter a question in the block settings.', 'attention-game' );
    echo '</p>';
}
?>
