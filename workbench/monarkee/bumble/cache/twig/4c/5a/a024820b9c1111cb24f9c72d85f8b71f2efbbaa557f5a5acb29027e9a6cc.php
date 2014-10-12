<?php

/* pages/traits.twig */
class __TwigTemplate_4c5aa024820b9c1111cb24f9c72d85f8b71f2efbbaa557f5a5acb29027e9a6cc extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'body_class' => array($this, 'block_body_class'),
            'content_header' => array($this, 'block_content_header'),
            'content' => array($this, 'block_content'),
        );
    }

    protected function doGetParent(array $context)
    {
        return $this->env->resolveTemplate((isset($context["page_layout"]) ? $context["page_layout"] : $this->getContext($context, "page_layout")));
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 3
        $context["__internal_cb2219999e900a0c1ac5735620a695aa27314663edad7b6c540ea14d0d57e860"] = $this->env->loadTemplate("macros.twig");
        $this->getParent($context)->display($context, array_merge($this->blocks, $blocks));
    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        echo "Traits | ";
        $this->displayParentBlock("title", $context, $blocks);
    }

    // line 7
    public function block_body_class($context, array $blocks = array())
    {
        echo "overview";
    }

    // line 9
    public function block_content_header($context, array $blocks = array())
    {
        // line 10
        echo "    <h1>Traits</h1>
";
    }

    // line 13
    public function block_content($context, array $blocks = array())
    {
        // line 14
        echo "    <table>
        ";
        // line 15
        $context['_parent'] = (array) $context;
        $context['_seq'] = twig_ensure_traversable((isset($context["classes"]) ? $context["classes"] : $this->getContext($context, "classes")));
        foreach ($context['_seq'] as $context["_key"] => $context["class"]) {
            // line 16
            echo "            ";
            if ($this->getAttribute((isset($context["class"]) ? $context["class"] : $this->getContext($context, "class")), "trait")) {
                // line 17
                echo "                <tr>
                    <td>
                        ";
                // line 19
                echo $context["__internal_cb2219999e900a0c1ac5735620a695aa27314663edad7b6c540ea14d0d57e860"]->getclass_link((isset($context["class"]) ? $context["class"] : $this->getContext($context, "class")), array("target" => "main"), true);
                echo "
                    </td>
                    <td>
                        ";
                // line 22
                echo $this->env->getExtension('sami')->parseDesc($context, $this->getAttribute((isset($context["class"]) ? $context["class"] : $this->getContext($context, "class")), "shortdesc"), (isset($context["class"]) ? $context["class"] : $this->getContext($context, "class")));
                echo "
                    </td>
                </tr>
            ";
            }
            // line 26
            echo "        ";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['class'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        // line 27
        echo "    </table>
";
    }

    public function getTemplateName()
    {
        return "pages/traits.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  82 => 26,  93 => 27,  69 => 19,  63 => 5,  57 => 4,  32 => 3,  98 => 27,  92 => 23,  85 => 23,  74 => 20,  61 => 15,  45 => 7,  144 => 39,  136 => 36,  129 => 35,  125 => 33,  118 => 32,  114 => 30,  105 => 29,  101 => 28,  95 => 25,  88 => 27,  72 => 18,  66 => 18,  55 => 14,  26 => 3,  43 => 8,  41 => 7,  21 => 2,  379 => 58,  363 => 56,  358 => 55,  355 => 54,  350 => 53,  333 => 52,  331 => 51,  329 => 50,  318 => 49,  303 => 46,  291 => 45,  265 => 40,  261 => 39,  258 => 37,  255 => 35,  253 => 34,  236 => 33,  234 => 32,  222 => 31,  211 => 28,  205 => 27,  199 => 26,  185 => 25,  174 => 22,  168 => 21,  162 => 20,  148 => 19,  135 => 16,  133 => 15,  126 => 13,  119 => 11,  117 => 10,  104 => 9,  53 => 12,  37 => 6,  34 => 4,  25 => 4,  19 => 1,  110 => 32,  103 => 28,  99 => 26,  90 => 27,  87 => 24,  83 => 23,  79 => 21,  64 => 16,  62 => 16,  52 => 13,  49 => 11,  46 => 9,  40 => 5,  80 => 23,  76 => 22,  71 => 19,  60 => 13,  56 => 12,  50 => 9,  31 => 5,  94 => 28,  91 => 25,  84 => 8,  81 => 7,  75 => 22,  68 => 18,  65 => 17,  47 => 10,  44 => 9,  35 => 4,  29 => 6,  22 => 8,  70 => 19,  58 => 15,  54 => 11,  51 => 12,  48 => 9,  42 => 6,  38 => 7,  33 => 5,  30 => 3,  28 => 3,);
    }
}
