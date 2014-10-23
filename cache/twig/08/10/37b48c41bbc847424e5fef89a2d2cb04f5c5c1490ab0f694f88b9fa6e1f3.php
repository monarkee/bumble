<?php

/* layout/frame.twig */
class __TwigTemplate_081037b48c41bbc847424e5fef89a2d2cb04f5c5c1490ab0f694f88b9fa6e1f3 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("layout/base.twig");

        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'html' => array($this, 'block_html'),
            'frame_src' => array($this, 'block_frame_src'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "layout/base.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        // line 4
        echo "    ";
        $this->displayParentBlock("head", $context, $blocks);
        echo "
    <script src=\"";
        // line 5
        echo twig_escape_filter($this->env, $this->env->getExtension('sami')->pathForStaticFile($context, "js/jquery-1.3.2.min.js"), "html", null, true);
        echo "\" type=\"text/javascript\" charset=\"utf-8\"></script>
    <script src=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('sami')->pathForStaticFile($context, "js/permalink.js"), "html", null, true);
        echo "\" type=\"text/javascript\" charset=\"utf-8\"></script>
";
    }

    // line 9
    public function block_html($context, array $blocks = array())
    {
        // line 10
        echo "    <frameset cols=\"20%,80%\" frameborder=\"1\" border=\"1\" bordercolor=\"#bbb\" framespacing=\"1\">
        <frame src=\"";
        // line 11
        $this->displayBlock('frame_src', $context, $blocks);
        echo "\" name=\"index\">
        <frame src=\"";
        // line 12
        echo (((isset($context["has_namespaces"]) ? $context["has_namespaces"] : $this->getContext($context, "has_namespaces"))) ? ("namespaces") : ("classes"));
        echo ".html\" name=\"main\" id=\"main-frame\">
        <noframes>
            <body>
                Your browser does not support frames. Go to the <a href=\"namespaces.html\">non-frame version</a>.
            </body>
        </noframes>
    </frameset>
";
    }

    // line 11
    public function block_frame_src($context, array $blocks = array())
    {
    }

    public function getTemplateName()
    {
        return "layout/frame.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  70 => 11,  58 => 12,  54 => 11,  51 => 10,  48 => 9,  42 => 6,  38 => 5,  33 => 4,  30 => 3,  28 => 3,);
    }
}
