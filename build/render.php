<?php
$attributes = isset( $block->attributes ) ? $block->attributes : array();
?>


<div <?php echo get_block_wrapper_attributes(); ?> >

<!-- Question -->
<p>
	<?php echo esc_html( $attributes['question'] ); ?>
</p>

<!-- Answers -->
<?php if ( ! empty( $attributes['answers'] ) ) : ?>
	<div >
		<?php foreach ( $attributes['answers'] as $answer ) : ?>
			<button ><?php echo esc_html( $answer ); ?></button>
		<?php endforeach; ?>
	</div>
<?php endif; ?>

</div>

